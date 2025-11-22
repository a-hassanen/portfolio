import { useState, useEffect, useRef } from "react";

export default function useScrollHeader() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [activeItem, setActiveItem] = useState("aboutme");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const lastY = useRef(window.scrollY || 0);

  // Detect mobile / desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsHeaderHidden(false); // desktop always visible
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;

        if (isMobile) {
          // --- MOBILE ---
          if (currentY > lastY.current + 20) {
            // Scrolling down: hide
            setIsHeaderHidden(true);
          } else if (currentY < lastY.current - 5) {
            // Scrolling up: show
            setIsHeaderHidden(false);
          }
        } else {
          // --- DESKTOP ---
          setIsHeaderHidden(false); // always visible
        }

        // --- ACTIVE SECTION TRACKING ---
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
        const sections = document.querySelectorAll("section[id]");
        let currentActive = "";
        sections.forEach((section) => {
          const top = section.offsetTop - headerHeight - 50; // small buffer
          if (currentY >= top) currentActive = section.id;
        });
        setActiveItem(currentActive || "aboutme");

        // Update lastY every frame
        lastY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return { isHeaderHidden, activeItem, isMobile };
}
