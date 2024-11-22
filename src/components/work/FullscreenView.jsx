import React, { useState } from 'react';

export const FullscreenView = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fullscreen-view">
      <button 
        className="navigation-arrow" 
        onClick={handlePrev}
        style={{ 
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000
        }}
      >
        ↜
      </button>
      <button 
        className="navigation-arrow" 
        onClick={handleNext}
        style={{ 
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000
        }}
      >
        ↝
      </button>
      <div className="image-container">
        <div className="square-container">
          {images[currentIndex] && (
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
