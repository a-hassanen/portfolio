import React from 'react';
import portfolioData from './data/portfolioData.json';
import PortfolioView from './components/PortfolioView.jsx';
import EditorView from './components/EditorView.jsx';
import ResumeView from './components/ResumeView.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';

// Helper to determine the active page based on the pathname (e.g., /edit)
const getPageViewFromPath = () => {
    const pathname = window.location.pathname;
    
    // Get the base path configured in vite.config.js (e.g., '/portfolio')
    // We remove the trailing slash to ensure accurate path slicing.
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    
    // Slice the pathname to get the segment after the base (e.g., 'edit')
    // If the path is just the base (e.g., /portfolio/), pathSegment will be ''
    const pathSegment = pathname.replace(baseUrl, '').replace(/^\/|\/$/g, '');

    // Map the path segment to the view
    if (pathSegment === 'edit') return 'editor';
    if (pathSegment === 'resume-view') return 'resume';
    if (pathSegment === 'portfolio') return 'portfolio'; 

    // Default view for base path (e.g., yoursite.com/portfolio/) or unknown path
    return 'portfolio'; 
};

const App = () => {
    // 1. Initialize state based on the current PATH
    const [activePage, setActivePage] = React.useState(() =>
        getPageViewFromPath()
    );

    // Function to navigate using the History API (for internal links)
    const navigateTo = (pathSegment) => {
        // Construct the full URL with the base path
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
        const newUrl = `${baseUrl}/${pathSegment}`;
        
        // Change the URL in the browser without forcing a full page reload
        window.history.pushState(null, '', newUrl);
        
        // Manually update the active page state and scroll to the top
        setActivePage(getPageViewFromPath());
        window.scrollTo({ top: 0 });
    };


    React.useEffect(() => {

        // --- SCROLLING LOGIC (STILL USES HASH FOR SECTION JUMPS) ---
        // This logic remains to support portfolio section links (e.g., /portfolio/#skills)
        const handleScrollToHash = () => {
            const hash = window.location.hash;
            const id = hash.substring(1);

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
        
        // --- PATH ROUTING LOGIC ---
        
        const handlePopState = () => {
            // Fired when the user clicks the browser's back/forward buttons
            setActivePage(getPageViewFromPath());
        };

        const handleInternalLinkClick = (e) => {
            const target = e.target.closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            
            // Check if it's a link intended for our custom path routing 
            // We look for links starting with /edit or /resume-view, but NOT # 
            if (href && (href.startsWith('/edit') || href.startsWith('/resume-view')) && !href.includes('#')) {
                e.preventDefault(); // Stop the default page load
                // The navigateTo function handles the history update and state change
                navigateTo(href.replace(/^\//, '')); 
            }
            
            // Allow default hash jumps (#section) to pass through for handleScrollToHash
        };
        

        // Add listeners for path changes
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('click', handleInternalLinkClick);

        // Run scroll on initial load (if a hash is present)
        handleScrollToHash();

        // Cleanup function
        return () => {
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('click', handleInternalLinkClick);
        };
    }, [activePage]);
    
    // Resolve video path correctly in both DEV and GitHub Pages production
    const vidUrl = portfolioData.files.bgvidUrl1
        ? `${import.meta.env.BASE_URL}${portfolioData.files.bgvidUrl1.replace(/^\//, '')}`
        : '';

    return (
        <>
            <div className="video-overlay">
                <video className="background-video" autoPlay muted loop playsInline>
                <source src={vidUrl} type="video/mp4" />
                </video>
            </div>
            
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