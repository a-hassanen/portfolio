import { useState, useEffect } from "react";

export default function useMobileMenu(isMobile) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside header (only for mobile)
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e) => {
      const headerEl = document.querySelector(".header");
      if (headerEl && !headerEl.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  return { isMenuOpen, toggleMenu, closeMenu };
}
