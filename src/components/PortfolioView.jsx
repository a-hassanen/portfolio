import React from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import AboutMe from './AboutMe.jsx';
import Experience from './Experience.jsx';
import Education from './Education.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Certificates from './Certificates.jsx';
import Badges from './Badges.jsx';
import Resume from './Resume.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

const PortfolioView = ({ data }) => (
  <React.Fragment>
    <Header name={data.personalInfo.name} showEditorLink={false} />
    <main className="app-container">
      <Hero personalInfo={data.personalInfo} />
      <AboutMe aboutme={data.aboutme} />
      <Experience items={data.experience} />
      <Projects items={data.projects} />
      <Resume />
      <Certificates items={data.certificates} />
      <Badges items={data.badges} />
      <Education items={data.education} />
      <Skills items={data.skills} />
      <Contact personalInfo={data.personalInfo} />
    </main>
    <Footer name={data.personalInfo.name}/>
  </React.Fragment>
);

export default PortfolioView;