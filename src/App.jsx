import React from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import { Navigation } from './components/Navigation';
import { WorkPage } from './components/work/WorkPage';
import { AmbientSoundscape } from './components/AmbientSoundscape';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navigation />
      <WorkPage />
      <AmbientSoundscape />
    </>
  );
}
