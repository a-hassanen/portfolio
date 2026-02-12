import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import portfolioData from '../data/portfolioData.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills, badges } = portfolioData;

  // NEW: flatten grouped badges so Skills.jsx still works
  const flatBadges = Object.values(badges).flat();

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSkill, setExpandedSkill] = useState(null);

  const toggleSkill = (skill) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  const getBadgesForSkill = (skill) => {
  return flatBadges.filter((badge) => {
    if (!badge.skills) return false;

    const skillArray = Array.isArray(badge.skills)
      ? badge.skills.map(s => s.toLowerCase())
      : badge.skills.split(',').map(s => s.trim().toLowerCase());

    return skillArray.includes(skill.toLowerCase());
  });
};


  return (
    <section id="skills" className="skills-section">
      <div className="skills-header">
        <h2>Skills</h2>

        <div className="skills-search">
          <input
            id="skills-search-input"
            type="search"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Skills List */}
      {Object.entries(skills).map(([category, skillList], catIndex) => {
        const filteredSkills = skillList.filter((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );
        if (filteredSkills.length === 0) return null;

        return (
          <div key={category} id={category} className="skills-category">
            <h3>{category}</h3>
            <div  className={`skills-${category} card`}>
              <ul>
                {filteredSkills.map((skill, skillIndex) => {
                  const skillBadges = getBadgesForSkill(skill);
                  const isExpanded = expandedSkill === skill;
                  const skillId = `skill-${catIndex}-${skillIndex}`;

                  return (
                    <li
                      key={skillId}
                      className={`skill-item ${skillBadges.length > 0 ? 'expandable' : ''}`}
                      id={skillId}
                    >
                      <div
                        className="skill-header"
                        onClick={() => skillBadges.length > 0 && toggleSkill(skill)}
                      >
                        <span className="s-header">{skill}</span>
                        {skillBadges.length > 0 && (
                          <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>
                            <FaChevronDown className="chevron-icon" />
                          </span>
                        )}
                      </div>

                      {skillBadges.length > 0 && (
                        <div>
                          <span className="badge-count">
                            {skillBadges.length} source(s) of skill evidence
                          </span>
                        </div>
                      )}

                      {isExpanded && skillBadges.length > 0 && (
                        <div className="skill-badges">
                          {skillBadges.map((badge) => {
                            const badgeId = `badge-${badge.name.replace(/\s+/g, '-')}`;
                            return (
                              <span
                                key={badge.name}
                                className="badge"
                                onClick={() => {
                                  const element = document.getElementById(badgeId);
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    element.classList.add('highlight');
                                    setTimeout(() => element.classList.remove('highlight'), 2000);
                                  }
                                }}
                              >
                                {badge.name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
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
