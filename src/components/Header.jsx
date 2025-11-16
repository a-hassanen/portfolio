import React from 'react';
import '../styles/Header.css';

const Header = ({ name, showEditorLink }) => {
  // helper to update hash without letting the browser jump immediately
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    // If same hash, still trigger hashchange by resetting to '' then setting hash
    if (window.location.hash === `#${hash}`) {
      // small hack to force hashchange when clicking the same link twice
      history.replaceState(null, '', ' ');
      window.location.hash = hash;
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <header className="header">
      <nav>
        <a href="#top" className="logo" onClick={(e) => handleNavClick(e, '')}>{name}</a>

        <div className="nav-links">
          <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#resume" onClick={(e) => handleNavClick(e, 'resume')}>Resume</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>

          {showEditorLink && (
            <a
              href="#edit"
              className="button"
              onClick={(e) => handleNavClick(e, 'edit')}
            >
              Editor
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
