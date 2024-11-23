import React, { useState, useEffect } from "react";
import { Fountain } from "./Fountain";

const kawaiiFaces = [
  '♡', '✧', '*', '~', '!', '@', '#', '✿', '★', 
  '☆', '❀', '✮', '<3', '✩', '✫', '>', '<', 
  ':', ';', '*', '+', '.', '°', '`', '´',
];

const images = [
  '/images/about/me2.jpg',
  '/images/about/IMG_4434.jpeg',
  '/images/about/me3.jpeg',
  '/images/about/IMG_1570.jpeg',
  '/images/about/me1.jpg',
  '/images/about/IMG_7672.png',
  '/images/about/IMG_6194.png',
];

export const Typography = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [positions, setPositions] = useState(kawaiiFaces.map(() => ({
    x: Math.random() * (window.innerWidth - 400) + 270, // Start after menu
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.4,
    speed: {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    }
  })));

  useEffect(() => {
    const moveCharacters = () => {
      setPositions(prev => prev.map(pos => {
        let newX = pos.x + pos.speed.x;
        let newY = pos.y + pos.speed.y;

        // Bounce off boundaries while keeping away from menu
        if (newX < 270 || newX > window.innerWidth - 50) {
          pos.speed.x *= -1;
          newX = pos.x + pos.speed.x;
        }
        if (newY < 0 || newY > window.innerHeight - 50) {
          pos.speed.y *= -1;
          newY = pos.y + pos.speed.y;
        }

        return {
          ...pos,
          x: newX,
          y: newY,
          rotation: pos.rotation + (Math.random() - 0.5) * 2,
        };
      }));
    };

    const interval = setInterval(moveCharacters, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  const handleImageHover = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="typography-container" role="main" aria-label="About page content">
      <style dangerouslySetInnerHTML={{ __html: `
        .typography-container {
          position: relative;
          padding: calc(var(--grid-unit) * 3);
          margin-left: calc(var(--menu-width) + var(--grid-unit) * 3);
          max-width: 500px;
          margin-top: calc(var(--grid-unit) * 3);
        }

        .main-text {
          font-family: "Times New Roman", serif;
          font-size: 16px;
          line-height: 1;
          color: black;
        }

        .main-text span {
          display: block;
          margin-bottom: calc(var(--grid-unit));
        }

        @media (prefers-reduced-motion: no-preference) {
          .main-text span {
            animation: jitter1 0.1s infinite;
          }
          
          .main-text span:nth-child(2) { 
            animation: jitter2 0.15s infinite;
          }
          .main-text span:nth-child(3) { 
            animation: jitter3 0.12s infinite;
          }

          .secondary-text {
            animation: jitter2 0.13s infinite;
          }

          .contact {
            animation: jitter3 0.11s infinite;
          }

          @keyframes jitter1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(0.5px, 0.2px); }
          }

          @keyframes jitter2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-0.3px, 0.4px); }
          }

          @keyframes jitter3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(0.2px, -0.3px); }
          }
        }

        .secondary-text {
          font-family: "Times New Roman", serif;
          font-size: 16px;
          line-height: 1;
          margin-top: calc(var(--grid-unit) * 2);
          margin-bottom: calc(var(--grid-unit) * 2);
          color: black;
        }

        .contact {
          font-family: "Times New Roman", serif;
          font-size: 16px;
          line-height: 1;
          color: black;
          margin-bottom: calc(var(--grid-unit) * 2);
        }

        .highlight-text {
          color: #464655;
          -webkit-text-stroke: 1px #464655;
          text-stroke: 1px #464655;
          font-weight: bold;
        }

        .image-container {
          width: 300px;
          height: 300px;
          position: relative;
          margin-top: calc(var(--grid-unit) * 2);
          cursor: pointer;
          overflow: hidden;
        }

        .hover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease-out;
        }

        .kawaii-char {
          position: fixed;
          font-size: 20px;
          transition: transform 0.3s ease-out;
          color: #CDDFFA;
          opacity: 0.6;
          pointer-events: none;
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .typography-container {
            margin-left: 0;
            padding: calc(var(--grid-unit) * 3);
            margin-top: calc(var(--grid-unit) * 12);
          }
        }
      `}} />
      {kawaiiFaces.map((char, i) => (
        <div
          key={i}
          className="kawaii-char"
          style={{
            left: `${positions[i].x}px`,
            top: `${positions[i].y}px`,
            transform: `rotate(${positions[i].rotation}deg) scale(${positions[i].scale})`,
          }}
        >
          {char}
        </div>
      ))}
      <div className="main-text">
        <span>the sound of moving water</span>
        <span>a shallow basin with a rough surface and gently sloping sides</span>
        <span>a shallow spot under a tree</span>
      </div>
      <div className="secondary-text">
        documenting quiet moments and close encounters.
      </div>
      <div className="contact">
        from <span className="highlight-text">emery</span> in <span className="highlight-text">brooklyn, nyc</span>
      </div>
      <div className="image-container" onMouseEnter={handleImageHover} onTouchStart={handleImageHover}>
        <img
          className="hover-image"
          src={images[currentImageIndex]}
          alt="Profile"
        />
      </div>
      <Fountain />
    </div>
  );
};
