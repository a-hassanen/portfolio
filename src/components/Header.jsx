import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ name, showEditorLink }) => {
  const [activeItem, setActiveItem] = useState('aboutme');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { id: 'aboutme', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'badges', label: 'Badges' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const header = document.querySelector('.header');
  const offset = header ? header.offsetHeight : 0;

  let currentSection = activeItem;
  menuItems.forEach((item, index) => {
    const section = document.getElementById(item.id);
    if (section) {
      const sectionTop = section.offsetTop - offset - 1; // small buffer
      const sectionBottom = sectionTop + section.offsetHeight;

      // Highlight if scroll is inside the section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = item.id;
      }

      // Special case: last section
      if (index === menuItems.length - 1 && scrollPosition + window.innerHeight >= document.body.scrollHeight) {
        currentSection = item.id;
      }
    }
  });

  setActiveItem(currentSection);
    };


    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('.header');
      const offset = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  // --- Dark mode effect ---
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);
  const base = import.meta.env.BASE_URL; 

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-container">
        <div className="logo"><a className="logo-home" href={base}>{name}</a></div>
        <nav className="nav-links">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`nav-button ${activeItem === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {showEditorLink && (
            <button
              onClick={(e) => handleNavClick(e, 'edit')}
              className="nav-button editor"
            >
              Editor
            </button>
          )}
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="nav-button dark-toggle"
          >
            {isDarkMode ? "🌞" : "🌙"}
        </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
