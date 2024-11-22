import React from 'react';

export const GalleryView = ({ images = [] }) => {
  const gridSize = 300;
  const gap = 20;
  const columns = 3;
  const totalWidth = (gridSize * columns) + (gap * (columns - 1));

  return (
    <div className="gallery-view">
      <div 
        className="gallery-grid"
        style={{
          width: `${totalWidth}px`,
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {images.map((image, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          
          return (
            <div
              key={image.id}
              className="gallery-item"
              style={{
                width: `${gridSize}px`,
                height: `${gridSize}px`,
                top: `${row * (gridSize + gap)}px`,
                left: `${col * (gridSize + gap)}px`,
                position: 'absolute'
              }}
            >
              <div className="image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
