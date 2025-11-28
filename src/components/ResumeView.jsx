import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../styles/ResumeView.css';
import portfolioData from '../data/portfolioData.json';

const ResumeView = () => {
  // Dynamically use Vite's base URL
  const base = import.meta.env.BASE_URL; 
  // Resolve resumes path correctly in both DEV and GitHub Pages production
  const pdfUrl = portfolioData.files.pdfUrl
    ? base + portfolioData.files.pdfUrl.replace(/^\//, "")
    : "";
  const wordUrl = portfolioData.files.wordUrl
    ? base + portfolioData.files.wordUrl.replace(/^\//, "")
    : "";

  return (
    <>
      <Header name={portfolioData.personalInfo.name} showEditorLink={false} />
      <main className="app-container">
        <div className="resume-view">
          <h2>My Resume</h2>
          <div className="resume-actions">
            {pdfUrl && <a href={pdfUrl} download className="button">Download PDF</a>}
            {wordUrl && <a href={wordUrl} download className="button">Download Word</a>}

            <div className="go-back-link">
              <a href="" className="button">Go Back</a>
            </div>
          </div>
          
          {(!pdfUrl && !wordUrl) && (
            <div className="card resume-error">
              <p>No resume files found. Please upload PDF or Word versions in /public/assets/resumes/.</p>
            </div>
          )}

          {pdfUrl && (
            <div className="resume-embed card">
              <iframe
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="800px"
                title="Resume"
                id="resume-iframe"
                className="resume-iframe"
              />
            </div>
          )}
        </div>
      </main>
      <Footer name={portfolioData.personalInfo.name} />
    </>
  );
};

export default ResumeView;