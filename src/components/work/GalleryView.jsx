import React, { useState, useRef, useEffect } from 'react';
import { ImageTransition } from './types';

const GRID_SIZE = 300; // Size for both width and height
const GRID_GAP = 24; // Gap between grid items

const GalleryView = ({ images }) => {
  const containerRef = useRef(null);

  const calculateGridPosition = (index) => {
    const menuWidth = 200;
    const padding = 24;
    const columnsPerRow = Math.floor((window.innerWidth - menuWidth - padding * 2) / (GRID_SIZE + GRID_GAP));
    
    const row = Math.floor(index / columnsPerRow);
    const col = index % columnsPerRow;
    
    return {
      x: menuWidth + padding + col * (GRID_SIZE + GRID_GAP),
      y: padding + row * (GRID_SIZE + GRID_GAP)
    };
  };

  const isLowQuality = (image) => {
    return image.width < 800 || image.height < 800;
  };

  return (
    <div
      ref={containerRef}
      className="gallery-view"
    >
      <div className="gallery-grid">
        {images.map((image, index) => {
          const position = calculateGridPosition(index);
          const lowQuality = isLowQuality(image);

          return (
            <div
              key={image.id}
              className={`gallery-item ${lowQuality ? 'low-quality' : ''}`}
              style={{
                left: position.x,
                top: position.y,
                width: GRID_SIZE,
                height: GRID_SIZE,
              }}
            >
              <div className="image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {lowQuality && <div className="halo-effect" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryView;
