import React, { useState } from 'react';
import portfolioData from '../data/portfolioData.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills } = portfolioData;
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section id="skills" className="skills-section">
      <div className="skills-header">
        <h2>Skills</h2>
        <div className="skills-search">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      {Object.entries(skills).map(([category, skillList]) => {
        const filteredSkills = skillList.filter((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );
        if (filteredSkills.length === 0) return null;
        return (
          <div key={category} className="skills-category">
            <h3>{category}</h3>
            <ul>
              {filteredSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      })}

      {Object.values(skills).every((skillList) => 
        skillList.filter((skill) => skill.toLowerCase().includes(searchTerm)).length === 0
      ) && searchTerm && <p>No skills match your search.</p>}
    </section>
  );
};

export default Skills;
