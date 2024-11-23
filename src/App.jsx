import React from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import { Navigation } from './components/Navigation';
import { WorkPage } from './components/work/WorkPage';
import { AmbientSoundscape } from './components/AmbientSoundscape';

export default function App() {
  const path = window.location.pathname;
  
  const renderContent = () => {
    if (path === '/work') {
      return <WorkPage />;
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      <Navigation />
      {renderContent()}
      <AmbientSoundscape />
    </>
  );
}
