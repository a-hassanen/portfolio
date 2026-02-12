import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Badges.css';

const Badges = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="badges"
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      <h2>Badges</h2>
      <div className="card">
        {Object.entries(items).map(([category, badges], index) => (
          <div key={index} className={`badge-category-${index}`}>
            <h3>{category}</h3>
            <ul className="badges-grid">
              {badges.map((badge, badgeIndex) => {
                const badgeId = `badge-${badge.name.replace(/\s+/g, '-')}`;
                return (
                  <div key={badgeIndex} className={`badge-${badgeIndex}-container`}>
                    <a
                      key={index}
                      id={badgeId}
                      href={badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge-item-link"
                    >
                      <div className="badge-item card">
                        <img src={badge.imageUrl} alt={badge.name} />
                        <span className="badgename"> {badge.name}</span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Badges;
