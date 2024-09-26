import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);


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
        <li><NavLink to="/" onClick={() => {
          setNavOpen(false);
        }}>Interactive Map</NavLink></li>
        <li><NavLink to="/ranking" onClick={() => {
          setNavOpen(false);
        }}>Ranking</NavLink></li>
        <li><NavLink to="/compare" onClick={() => {
          setNavOpen(false);
        }}>Compare</NavLink></li>
        <li><NavLink to="/sdgs" onClick={() => {
          setNavOpen(false);
        }}>SDGs</NavLink></li>
        <li><NavLink to="/about" onClick={() => {
          setNavOpen(false);
        }}>About</NavLink></li>
      </ul>
    </div>
  );
};

export default Navbar;