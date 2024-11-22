import React from "react";

export const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root {
      --grid-unit: 8px;
      --menu-width: 200px;
      --linky-blue: rgb(37, 99, 235);
      --transition-timing: 0.2s ease-out;
      --grid-size: 300px;
      --grid-gap: 24px;
    }

    body {
      background-color: white;
      color: black;
      font-family: "Helvetica Neue", sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      overflow: hidden;
    }

    .nav {
      position: fixed;
      top: calc(var(--grid-unit) * 3);
      left: calc(var(--grid-unit) * 3);
      width: var(--menu-width);
      font-size: 24px;
      line-height: 1;
      padding-right: calc(var(--grid-unit) * 3);
      z-index: 1000;
    }

    .nav ul {
      display: flex;
      flex-direction: column;
      gap: calc(var(--grid-unit) * 1.5);
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .nav a {
      display: block;
      color: black;
      text-decoration: none;
      -webkit-text-stroke: 1px #4b5563;
      text-stroke: 1px #4b5563;
      transition: all var(--transition-timing);
    }

    .nav a:hover {
      color: var(--linky-blue);
      -webkit-text-stroke: 1px var(--linky-blue);
      text-stroke: 1px var(--linky-blue);
    }

    /* Loading Indicator */
    .loading-indicator {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 2px;
      background: rgba(37, 99, 235, 0.1);
      border-radius: 1px;
      overflow: hidden;
    }

    .loading-progress {
      height: 100%;
      background: var(--linky-blue);
      transition: width 0.3s ease-out;
    }

    /* Work Page Specific */
    .work-view-toggle {
      position: fixed;
      top: calc(var(--grid-unit) * 3);
      right: calc(var(--grid-unit) * 3);
      background: none;
      border: none;
      font-size: 24px;
      padding: calc(var(--grid-unit));
      cursor: pointer;
      z-index: 1000;
      color: var(--linky-blue);
      transition: transform var(--transition-timing),
                  opacity var(--transition-timing);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }

    .work-view-toggle:hover {
      transform: scale(1.1);
      opacity: 1;
    }

    .fullscreen-view {
      position: fixed;
      top: 0;
      left: var(--menu-width);
      right: 0;
      bottom: 0;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: calc(var(--grid-unit) * 3);
    }

    .fullscreen-view .image-container {
      position: relative;
      width: min(80vh, 80vw);
      height: min(80vh, 80vw);
    }

    .fullscreen-view .square-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: calc(var(--grid-unit) / 2);
    }

    .fullscreen-view .square-container img {
      transition: filter var(--transition-timing),
                  opacity var(--transition-timing);
    }

    .fullscreen-view .square-container img.transitioning {
      filter: blur(10px);
    }

    .gallery-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding-top: calc(var(--grid-unit) * 8);
      padding-left: calc(var(--menu-width) + var(--grid-unit) * 3);
      padding-right: calc(var(--grid-unit) * 3);
      padding-bottom: calc(var(--grid-unit) * 3);
      overflow-y: auto;
    }

    .gallery-grid {
      position: relative;
      min-height: 200vh;
    }

    .gallery-item {
      position: absolute;
      transition: transform var(--transition-timing),
                  box-shadow var(--transition-timing);
      border-radius: calc(var(--grid-unit) / 2);
      overflow: hidden;
    }

    .gallery-item .image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .gallery-item:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .low-quality .halo-effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      mix-blend-mode: screen;
      pointer-events: none;
      filter: blur(8px);
    }

    .low-quality img {
      filter: blur(1px) brightness(1.05);
    }

    .navigation-arrow {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: calc(var(--grid-unit) * 3);
      cursor: pointer;
      opacity: 0.6;
      transition: opacity var(--transition-timing);
      z-index: 1000;
      color: var(--linky-blue);
    }

    .navigation-arrow:hover {
      opacity: 1;
    }

    .navigation-arrow.prev {
      left: calc(var(--menu-width) + var(--grid-unit) * 3);
    }

    .navigation-arrow.next {
      right: calc(var(--grid-unit) * 3);
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-weight: 500;
      line-height: 1.2;
    }

    p {
      margin: 0 0 calc(var(--grid-unit) * 2) 0;
    }

    /* Image Treatment */
    img {
      max-width: 100%;
      height: auto;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
    }

    /* Scrollbar Styling */
    .gallery-view::-webkit-scrollbar {
      width: 8px;
    }

    .gallery-view::-webkit-scrollbar-track {
      background: transparent;
    }

    .gallery-view::-webkit-scrollbar-thumb {
      background-color: rgba(37, 99, 235, 0.3);
      border-radius: 4px;
    }

    .gallery-view::-webkit-scrollbar-thumb:hover {
      background-color: rgba(37, 99, 235, 0.5);
    }
  `}} />
);
