import React from "react";
import { Fountain } from "./Fountain";

export const Typography = () => (
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
        font-family: "Times New Roman", Times, serif;
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
        font-family: "Times New Roman", Times, serif;
        font-size: 16px;
        line-height: 1;
        margin-top: calc(var(--grid-unit) * 2);
        margin-bottom: calc(var(--grid-unit) * 2);
        color: black;
      }

      .contact {
        font-family: "Times New Roman", Times, serif;
        font-size: 16px;
        line-height: 1;
        color: black;
      }

      @media (max-width: 768px) {
        .typography-container {
          margin-left: 0;
          padding: calc(var(--grid-unit) * 3);
          margin-top: calc(var(--grid-unit) * 12);
        }
      }
    `}} />
    <div className="main-text">
      <span>the sound of moving water</span>
      <span>a shallow basin with a rough surface and gently sloping sides</span>
      <span>a shady spot under a tree</span>
    </div>
    <div className="secondary-text">
      documenting quiet moments and close encounters.
    </div>
    <div className="contact">
      contact@
    </div>
    <Fountain />
  </div>
);
