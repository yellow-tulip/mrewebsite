import React from "react";

export const Fountain = () => {
  return (
    <div className="fountain-wrapper">
      <style>{`
        .fountain-wrapper {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 250px;
          height: 250px;
          image-rendering: pixelated;
        }

        .fountain-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>
      <img 
        src="/images/fountain.webp" 
        alt="Pixel art fountain with birds" 
        className="fountain-image"
      />
    </div>
  );
};
