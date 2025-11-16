import React, { useState } from 'react';
import portfolioData from '../data/portfolioData.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills, badges } = portfolioData;
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSkill, setExpandedSkill] = useState(null);

  const toggleSkill = (skill) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  // Function to get badges linked to a skill
  const getBadgesForSkill = (skill) => {
    return badges.filter((badge) => badge.skills?.includes(skill));
  };

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
              {filteredSkills.map((skill) => {
                const skillBadges = getBadgesForSkill(skill);
                const isExpanded = expandedSkill === skill;

                return (
                  <li key={skill} className="skill-item">
                    <div
                      className="skill-header"
                      onClick={() => toggleSkill(skill)}
                    >
                      <span>{skill}</span>
                      {/* Chevron arrow */}
                      <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                      {skillBadges.length > 0 && (
                       <div><span className="badge-count">
                        {skillBadges.length} source(s) of skill evidence
                        </span> </div>
                      )}
                    
                    {isExpanded && skillBadges.length > 0 && (
                      <div className="skill-badges">
                        {skillBadges.map((badge) => (
                          <span key={badge.name} className="badge">
                            {badge.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
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
