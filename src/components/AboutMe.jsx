import React from "react";
import "../styles/AboutMe.css";

const AboutMe = ({ aboutme }) => {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="about-title">About Me</h2>

      <div className="about-content">
        {/* Left side description */}
        <p className="about-text">{aboutme.description}</p>

        {/* Right side professional details */}
        <div className="card" id="about-details">
          <h3 className="details-title">Professional Details</h3>

          <ul className="details-list">
            <li>
              <strong>⏱️Availability:</strong> {aboutme.Availability}
            </li>
            <li>
              <strong>📍Location:</strong> {aboutme.Location}
            </li>
            <li>
              <strong>🌍Preferred Locations:</strong> {aboutme.PreferredLocations}
            </li>

            <li>
              <strong>🚚Relocation:</strong> {aboutme.Relocation}
            </li>

            <li>
              <strong>🗣️Languages:</strong>
              <ul className="languages-list">
                {aboutme.Languages.map((lang, index) => (
                  <li key={index}>
                    {lang.name} — {lang.proficiency}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;