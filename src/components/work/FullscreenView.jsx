import React, { useState, useCallback, useEffect } from 'react';
import { ImageTransition } from './types';

const NavigationArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`navigation-arrow ${direction}`}
    aria-label={`View ${direction === 'prev' ? 'previous' : 'next'} image`}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: direction === 'prev' ? 'rotate(180deg)' : 'none'
      }}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  </button>
);

const FullscreenView = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextImage, setNextImage] = useState(null);
  const [direction, setDirection] = useState(null);

  // Preload adjacent images
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    preloadImage(images[nextIndex].src);
    preloadImage(images[prevIndex].src);
  }, [currentIndex, images]);

  const navigate = useCallback((dir) => {
    if (transitioning || !images.length) return;
    
    const newIndex = dir === 'next'
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;

    setTransitioning(true);
    setDirection(dir);
    setNextImage(images[newIndex]);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTransitioning(false);
      setNextImage(null);
      setDirection(null);
    }, ImageTransition.DURATION * 1000);
  }, [currentIndex, images, transitioning]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      navigate('prev');
    } else if (e.key === 'ArrowRight') {
      navigate('next');
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!images.length) return null;

  const currentImage = images[currentIndex];
  const isLowQuality = currentImage.width < 800 || currentImage.height < 800;

  return (
    <div className="fullscreen-view sound-reactive">
      <div
        className={`image-container ${isLowQuality ? 'low-quality' : ''} ${transitioning ? 'transitioning' : ''}`}
      >
        <div className="square-container">
          <img
            key={`current-${currentImage.src}`}
            src={currentImage.src}
            alt={currentImage.alt}
            className={transitioning ? 'transitioning' : ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: transitioning ? 0 : 1,
              transform: `scale(${transitioning ? 0.95 : 1})`,
              filter: `blur(${transitioning ? '10px' : '0'})`,
              transition: `
                opacity ${ImageTransition.DURATION}s ${ImageTransition.EASING},
                transform ${ImageTransition.DURATION}s ${ImageTransition.EASING},
                filter ${ImageTransition.DURATION}s ${ImageTransition.EASING}
              `
            }}
          />
          {nextImage && (
            <img
              key={`next-${nextImage.src}`}
              src={nextImage.src}
              alt={nextImage.alt}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: transitioning ? 1 : 0,
                transform: `scale(${transitioning ? 1 : 1.05})`,
                filter: `blur(${transitioning ? '0' : '10px'})`,
                transition: `
                  opacity ${ImageTransition.DURATION}s ${ImageTransition.EASING},
                  transform ${ImageTransition.DURATION}s ${ImageTransition.EASING},
                  filter ${ImageTransition.DURATION}s ${ImageTransition.EASING}
                `
              }}
            />
          )}
          {isLowQuality && <div className="halo-effect" />}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <NavigationArrow 
            direction="prev" 
            onClick={() => navigate('prev')} 
          />
          <NavigationArrow 
            direction="next" 
            onClick={() => navigate('next')} 
          />
        </>
      )}
    </div>
  );
};

export default FullscreenView;
