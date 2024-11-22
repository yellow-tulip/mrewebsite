import React, { useState } from 'react';
import { useWorkImages } from './useWorkImages';
import { GalleryView } from './GalleryView';
import { FullscreenView } from './FullscreenView';
import { ViewToggle } from './ViewToggle';

export const WorkPage = () => {
  const [isGalleryView, setIsGalleryView] = useState(true);
  const { images } = useWorkImages();

  return (
    <>
      <ViewToggle 
        isGalleryView={isGalleryView} 
        onClick={() => setIsGalleryView(!isGalleryView)} 
      />
      {isGalleryView ? (
        <GalleryView images={images} />
      ) : (
        <FullscreenView images={images} />
      )}
    </>
  );
};
