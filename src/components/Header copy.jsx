// import React, { useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import "../styles/Header.css";
// import useScrollHeader from "../hooks/useScrollHeader";
// import useMobileMenu from "../hooks/useMobileMenu";
// import useDarkMode from "../hooks/useDarkMode";

// const Header = ({ name, showEditorLink }) => {
//   const { isHeaderHidden, activeItem, isMobile } = useScrollHeader();
//   const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu(isMobile);
//   const { isDarkMode, toggleDarkMode } = useDarkMode();

//   const navRef = useRef(null);

//   const menuItems = [
//     { id: "aboutme", label: "About Me" },
//     { id: "experience", label: "Experience" },
//     { id: "projects", label: "Projects" },
//     { id: "resume", label: "Resume" },
//     { id: "certificates", label: "Certificates" },
//     { id: "badges", label: "Badges" },
//     { id: "education", label: "Education" },
//     { id: "skills", label: "Skills" },
//     { id: "contact", label: "Contact" }
//   ];

//   const base = import.meta.env.BASE_URL || "/";

//   const handleNavClick = (e, id) => {
//     e.preventDefault();
//     closeMenu();

//     const element = document.getElementById(id);
//     if (element) {
//       const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
//       window.scrollTo({
//         top: element.offsetTop - headerHeight,
//         behavior: "smooth"
//       });
//     }
//   };

//   return (
//     <header className={`header ${isHeaderHidden ? "hide" : ""} ${isDarkMode ? "dark" : ""}`}>
//       <div className="header-container">
//         <div className="logo">
//           <a className="logo-home" href={base}>{name}</a>
//         </div>

//         <button
//           className="hamburger-menu-icon"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <nav ref={navRef} className={`nav-links ${isMenuOpen ? "active" : ""}`}>
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               onClick={e => handleNavClick(e, item.id)}
//               className={`nav-button ${activeItem === item.id ? "active" : ""}`}
//             >
//               {item.label}
//             </button>
//           ))}

//           {showEditorLink && (
//             <button
//               onClick={e => handleNavClick(e, "edit")}
//               className="nav-button editor"
//             >
//               Editor
//             </button>
//           )}

//           <button
//             onClick={toggleDarkMode}
//             className="nav-button dark-toggle"
//           >
//             {isDarkMode ? "🌞" : "🌙"}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
