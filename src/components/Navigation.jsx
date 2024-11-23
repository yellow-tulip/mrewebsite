import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <>
    <nav className="nav">
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/work">work</Link></li>
        <li><Link to="/contact">contact</Link></li>
      </ul>
    </nav>
    <div className="asterisk">*</div>
  </>
);
