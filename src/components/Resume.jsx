import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';

const Resume = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="resume" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>Resume</h2>
            <div className="card">
                <p>Interested in my full background? View my resume for a detailed look at my experience and skills.</p>
                <a href="/resume-view" className="button" style={{ marginTop: '1rem' }}>View My Resume</a>
            </div>
        </section>
    );
};

export default Resume;