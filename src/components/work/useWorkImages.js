import { useState, useEffect } from 'react';

// Images arranged in pairs as shown in the layout
const imageFiles = [
  'IMG_0988.JPG',       // Night light
  'IMG_3822.png',       // Night architecture
  'IMG_8916.JPEG',      // Window reflection
  'drafts-06.jpg',      // Orange/red fire
  'IMG_3829.png',       // Red/warm lighting
  'image4.png',         // Person on bridge
  'image3.jpg',         // Monochrome sketch
  'IMG_0138.jpg',       // Cool minimal
  'tumblr_130bd78a46ff094048.jpg',  // White fabric
  'IMG_7183.JPEG'       // Snow texture
];

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

export const useWorkImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          imageFiles.map(async (filename, index) => {
            try {
              const src = `/images/work/${filename}`;
              console.log('Loading image:', src);
              const dimensions = await loadImage(src);
              return {
                id: `image-${index}`,
                src,
                alt: `Work ${index + 1}`,
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
          setImages(loadedImages.filter(img => img !== null));
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading images:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  return { 
    images, 
    loading, 
    error,
    progress: loading ? 0 : 100
  };
};
