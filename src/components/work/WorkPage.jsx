import React, { useState } from 'react';
import { ViewMode } from './types';
import FullscreenView from './FullscreenView';
import GalleryView from './GalleryView';
import ViewToggle from './ViewToggle';
import { useWorkImages } from './useWorkImages';

export const WorkPage = () => {
  const [viewMode, setViewMode] = useState(ViewMode.FULLSCREEN);
  const [transitioning, setTransitioning] = useState(false);
  const { images, loading, error, progress } = useWorkImages();

  const handleViewToggle = () => {
    setTransitioning(true);
    setViewMode(current => 
      current === ViewMode.FULLSCREEN ? ViewMode.GALLERY : ViewMode.FULLSCREEN
    );
    setTimeout(() => setTransitioning(false), 200); // Match transition duration
  };

  if (loading && progress < 100) {
    return (
      <div className="content-wrapper">
        <div className="loading-indicator">
          <div 
            className="loading-progress"
            style={{
              width: `${progress}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="grid-col-12">
          <p>Error loading works: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ViewToggle 
        currentMode={viewMode} 
        onToggle={handleViewToggle}
      />

      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.2s ease-out',
          pointerEvents: transitioning ? 'none' : 'auto'
        }}
      >
        {viewMode === ViewMode.FULLSCREEN ? (
          <FullscreenView images={images} />
        ) : (
          <GalleryView images={images} />
        )}
      </div>
    </>
  );
};

export default WorkPage;
