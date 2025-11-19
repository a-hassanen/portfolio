import React from 'react';
import portfolioData from './data/portfolioData.json';
import PortfolioView from './components/PortfolioView.jsx';
import EditorView from './components/EditorView.jsx';
import ResumeView from './components/ResumeView.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';

// Helper to determine which "page" is active based on the hash
const getPageViewFromHash = (hash) => {
    if (hash === '#edit') return 'editor';
    if (hash === '#resume-view') return 'resume';
    return 'portfolio'; // Default page for any other hash or no hash
};

const App = () => {
    const [activePage, setActivePage] = React.useState(() =>
        getPageViewFromHash(window.location.hash)
    );

    React.useEffect(() => {

        const handleScrollToHash = () => {
            const hash = window.location.hash;
            const id = hash.substring(1);

            // Only scroll inside portfolio page
            if (activePage !== 'portfolio') return;

            setTimeout(() => {
                if (!id) return;

                const element = document.getElementById(id);
                if (element) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;

                    const offsetPosition =
                        element.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 20);
        };

        const handleHashChange = (e) => {
            // Stop browser default jump
            if (e) e.preventDefault();

            const hash = window.location.hash;
            const targetPage = getPageViewFromHash(hash);

            setActivePage(targetPage);

            // Scroll after page is visible
            if (targetPage === 'portfolio') {
                handleScrollToHash();
            } else {
                window.scrollTo({ top: 0 });
            }
        };

        // Add custom listener
        window.addEventListener('hashchange', handleHashChange);

        // Run on initial load
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [activePage]);
    // Resolve video path correctly in both DEV and GitHub Pages production
    const vidUrl = portfolioData.files.bgvidUrl1
        ? `${import.meta.env.BASE_URL}${portfolioData.files.bgvidUrl1.replace(/^\//, '')}`
        : '';

    return (
        <>
            {/* <div className="video-overlay">
                <video className="background-video" autoPlay muted loop playsInline>
                <source src={vidUrl} type="video/mp4" />
                </video>
            </div> */}
            <div style={{ display: activePage === 'portfolio' ? 'block' : 'none' }}>
                <PortfolioView data={portfolioData} />
            </div>

            <div style={{ display: activePage === 'editor' ? 'block' : 'none' }}>
                <EditorView initialData={portfolioData} />
            </div>

            <div style={{ display: activePage === 'resume' ? 'block' : 'none' }}>
                <ResumeView />
            </div>

            <BackToTopButton />
        </>
    );
};

export default App;
