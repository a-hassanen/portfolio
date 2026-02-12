import React from 'react';
import '../styles/Footer.css';

const Footer = ({ name }) => (
    <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {name}. All Rights Reserved.</p>
        <p className="proprietary">This code is proprietary and may not be copied, modified, or distributed without permission.</p>
    </footer>
);

export default Footer;