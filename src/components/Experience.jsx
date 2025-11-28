import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';

const Experience = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="experience" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2>Work Experience</h2>
      {items.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.title} at {item.company}</h3>
          <p><strong>{item.period}</strong></p>
          <p style={{ whiteSpace: "pre-line" }}>{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Experience;