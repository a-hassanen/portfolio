import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';

const Education = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="education" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2>Education</h2>
      {items.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.degree}</h3>
          <p><strong>{item.institution}</strong> | <strong>{item.location}</strong></p>
          <p>{item.period}</p>
          <p>{item.description}</p>
          <a href={item.link} className="button" style={{ marginTop: '1rem' }} target="_blank" rel="noopener noreferrer">View Certificate</a>
        </div>
      ))}
    </section>
  );
};

export default Education;
