import { useState, useEffect } from 'react';

const imageFiles = [
  'drafts-09.jpg',
  'drafts-11.jpg',
  'drafts-16.jpg',
  'drafts-17.jpg',
  'drafts-18.jpg',
  'drafts-19.jpg',
  'desk and frame.jpg',
  'IMG_0138.jpg',
  'IMG_0592.JPG',
  'IMG_0597.JPG',
  'IMG_0781.JPG',
  'IMG_0988.JPG',
  'IMG_1059.JPG',
  'IMG_1185.JPG',
  'IMG_1264.JPG',
  'IMG_2284.jpeg',
  'IMG_3822.png',
  'IMG_3829.png',
  'IMG_3889.png',
  'IMG_3892.png',
  'IMG_4161.png',
  'IMG_4434.png',
  'IMG_4451.png',
  'IMG_5823.png',
  'IMG_5826.png',
  'IMG_5827.png',
  'IMG_7183.JPEG',
  'IMG_7190.JPEG',
  'IMG_7229.JPG',
  'IMG_7400.JPEG',
  'IMG_7523.JPEG',
  'IMG_7672.png',
  'IMG_8057.JPEG',
  'IMG_8213.JPEG',
  'IMG_8916.JPEG',
  'Print.png',
  'tumblr_130bd78a46ff094fa5daa820f5be221e_f9b3bfdd_2048.jpg',
  'untitled.jpg'
].sort(() => Math.random() - 0.5); // Randomize image order

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        aspectRatio: img.width / img.height,
        loaded: true
      });
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

const BATCH_SIZE = 6; // Number of images to load initially

export const useWorkImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let currentBatch = 0;

    // Initialize all images with placeholders
    setImages(imageFiles.map((filename, index) => ({
      id: `image-${index}`,
      src: `/images/work/${filename}`,
      alt: `Work ${index + 1}`,
      loaded: false,
      position: { x: 0, y: 0 }
    })));

    const loadNextBatch = async () => {
      const start = currentBatch * BATCH_SIZE;
      const end = start + BATCH_SIZE;
      const batch = imageFiles.slice(start, end);

      if (batch.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const loadedBatch = await Promise.allSettled(
          batch.map(async (filename, index) => {
            try {
              const src = `/images/work/${filename}`;
              console.log('Loading image:', src); // Debug log
              const dimensions = await loadImage(src);
              return {
                id: `image-${start + index}`,
                src,
                alt: `Work ${start + index + 1}`,
                ...dimensions,
                position: { x: 0, y: 0 }
              };
            } catch (err) {
              console.warn(`Failed to load image: ${filename}`, err);
              return null;
            }
          })
        );

        if (mounted) {
          setImages(prev => {
            const newImages = [...prev];
            loadedBatch.forEach((result, index) => {
              if (result.status === 'fulfilled' && result.value) {
                newImages[start + index] = result.value;
              }
            });
            return newImages;
          });

          setLoadedCount(prev => prev + loadedBatch.filter(result => result.status === 'fulfilled' && result.value).length);
          currentBatch++;

          // Load next batch if there are more images
          if (end < imageFiles.length) {
            requestAnimationFrame(loadNextBatch);
          } else {
            setLoading(false);
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading images:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    // Start loading the first batch
    loadNextBatch();

    return () => {
      mounted = false;
    };
  }, []);

  return { 
    images: images.filter(img => img.loaded), 
    loading, 
    error,
    progress: loading ? Math.round((loadedCount / imageFiles.length) * 100) : 100
  };
};
