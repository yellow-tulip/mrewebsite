import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './components/GlobalStyles';
import { Navigation } from './components/Navigation';
import { WorkPage } from './components/work/WorkPage';
import { AmbientSoundscape } from './components/AmbientSoundscape';
import { Typography } from './components/Typography';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navigation />
      <Routes>
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<Typography />} />
        <Route path="/" element={null} />
      </Routes>
      <AmbientSoundscape />
    </>
  );
}
