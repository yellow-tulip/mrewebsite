import React from 'react';
import { ViewMode } from './types';

const ViewToggle = ({ currentMode, onToggle }) => (
  <button
    onClick={onToggle}
    className="work-view-toggle"
    aria-label={currentMode === ViewMode.FULLSCREEN ? 'Switch to gallery view' : 'Switch to fullscreen view'}
  >
    {currentMode === ViewMode.FULLSCREEN ? '◇' : '□'}
  </button>
);

export default ViewToggle;
