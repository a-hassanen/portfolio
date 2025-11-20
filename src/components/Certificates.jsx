import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Certificates.css';
import { FaCalendarAlt } from "react-icons/fa";

const Certificates = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="certificates" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2>Certificates</h2>
      <div className="card">
        {Object.entries(items).map(([category, certs], index) => (
          <div key={index} className="certificate-category">
            <h3>{category}</h3>
            <div className="cert-grid">
              {certs.map((cert, certIndex) => (
                <a key={certIndex} href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                  <div className="cert-content">
                    <h3 className="cert-title">{cert.name}</h3>
                    <h4 className="cert-provider">{cert.provider}</h4>
                    <div className="cert-footer">
                      <FaCalendarAlt className="cert-icon" />
                      <span className="cert-date">{cert.dateObtained}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;