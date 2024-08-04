import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavLinkClick = () => {
    setNavOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="My Logo" className="brand-logo" />
      </div>
      <div className="menu" id="menuToggle" onClick={() => setNavOpen(!navOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks">
        <li><NavLink to="/" onClick={handleNavLinkClick}>Interactive Map</NavLink></li>
        <li><NavLink to="/ranking" onClick={handleNavLinkClick}>Ranking</NavLink></li>
        <li><NavLink to="/compare" onClick={handleNavLinkClick}>Compare</NavLink></li>
        <li><NavLink to="/sdgs" onClick={handleNavLinkClick}>SDGs</NavLink></li>
        <li><NavLink to="/about" onClick={handleNavLinkClick}>About</NavLink></li>
      </ul>
    </div>
  );
};

export default Navbar;
