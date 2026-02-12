import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Contact.css';

const Contact = ({ personalInfo }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="contact" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>Contact</h2>
            
            <div className="contact-grid">

                {/* Email & Phone */}
                <div className="contact-category">
                    <h3>Contact Info</h3>
                    <a href={`mailto:${personalInfo.email}`} className="contact-button email">
                        <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/new-post.png" alt="Email"/>
                        {personalInfo.email}
                    </a>
                    <div className="button-pair">
                        <a className="contact-button phone small" href={`tel:${personalInfo.phone1}`} aria-label={`Call ${personalInfo.phone1}`}>
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" alt="call"/>
                            {personalInfo.phone1}
                        </a>
                        <a className="contact-button whatsapp small" href={`https://wa.me/${personalInfo.whatsapp1}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${personalInfo.whatsapp1}`}>
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" alt="whatsapp"/>
                            {personalInfo.whatsapp1}
                        </a>
                    </div>
                    <div className="button-pair">
                        <a className="contact-button phone small" href={`tel:${personalInfo.phone2}`} aria-label={`Call ${personalInfo.phone2}`}>
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" alt="call"/>
                            {personalInfo.phone2}
                        </a>
                        <a className="contact-button whatsapp small" href={`https://wa.me/${personalInfo.whatsapp2}`} target="_blank" rel="noopener noreferrer">
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" alt="whatsapp"/>
                            {personalInfo.whatsapp2}
                        </a>
                    </div>
                </div>

                {/* Social */}
                <div className="contact-category">
                    <h3>Messaging & Social</h3>
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-button linkedin">
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn"/>
                            LinkedIn
                        </a>
                    )}
                    {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-button github">
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub"/>
                            GitHub
                        </a>
                    )}
                </div>

                {/* Profiles & Certifications */}
                <div className="contact-category">
                    <h3>Profiles & Certifications</h3>
                    {personalInfo.credly && (
                        <a href={personalInfo.credly} target="_blank" rel="noopener noreferrer" className="contact-button credly">
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/badge.png" alt="Credly"/>
                            Credly
                        </a>
                    )}
                    {personalInfo.googleSkills && (
                        <a href={personalInfo.googleSkills} target="_blank" rel="noopener noreferrer" className="contact-button google-skills">
                            <img className="icon" src="https://img.icons8.com/ios-filled/50/ffffff/google-logo.png" alt="Google Skills"/>
                            Google Skills
                        </a>
                    )}
                    {personalInfo.coursera && (
                        <a href={personalInfo.coursera} target="_blank" rel="noopener noreferrer" className="contact-button coursera">
                            <svg role="img"  alt="Coursera" className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Coursera</title><path d="M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z"/></svg>
                            Coursera
                        </a>
                    )}
                </div>

                {/* Any remaining links can be added here */}
            </div>
        </section>
    );
};

export default Contact;
