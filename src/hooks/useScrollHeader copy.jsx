// import { useState, useEffect, useRef } from "react";

// export default function useScrollHeader() {
//   const [isHeaderHidden, setIsHeaderHidden] = useState(false);
//   const [activeItem, setActiveItem] = useState("aboutme");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const lastY = useRef(window.scrollY);

//   // Detect mobile/desktop
//   useEffect(() => {
//     const onResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) setIsHeaderHidden(false);
//     };

//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // TEST

//   const handleScroll = () => {
//     const currentY = window.scrollY || 0;

//     // Log scroll positions
//     console.log('currentY:', currentY, 'lastY:', lastY.current, 'isHeaderHidden:', isHeaderHidden);

//     if (isMobile) {
//       if (currentY > lastY.current && currentY > 60) {
//         setIsHeaderHidden(true);
//         console.log('Hiding header');
//       } else if (currentY < lastY.current - 5) {
//         setIsHeaderHidden(false);
//         console.log('Showing header');
//       }
//     }

//     lastY.current = currentY;

//     // Optional: inspect DOM
//     const headerEl = document.querySelector('.header');
//     if (headerEl) {
//       console.log('Header classes:', headerEl.className);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isMobile]);

//   // TEST END


//   // Scroll logic
//   useEffect(() => {
//     const onScroll = () => {
//       const currentY = window.scrollY;

//       // ----- MOBILE -----
//       if (isMobile) {
//         if (currentY > lastY.current && currentY > 60) console.log('isMobile Hiding header'), setIsHeaderHidden(true);
//         else if (currentY < lastY.current - 10) console.log('isMobile Showing header'), setIsHeaderHidden(false);
//       } 
//       // ----- DESKTOP -----
//       else {
//         if (isHeaderHidden) setIsHeaderHidden(false);
//       }
      
//       // ----- Active section tracking -----
//       const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
//       const sections = document.querySelectorAll("section[id]");
//       let active = "";
//       sections.forEach((section) => {
//         const top = section.offsetTop - headerHeight - 80;
//         if (currentY >= top) active = section.id;
//       });
//       setActiveItem(active || "aboutme");

//       lastY.current = currentY;
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [isMobile, isHeaderHidden]);

//   return { isHeaderHidden, activeItem, isMobile };
// }
