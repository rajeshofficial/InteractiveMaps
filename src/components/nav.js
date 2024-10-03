import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="navbar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', marginLeft : '6px ' }}>
        <h1 style={{ display: 'flex', fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: '#e5243b' }}>I</span>
          <span style={{ color: '#dda63a' }}>N</span>
          <span style={{ color: '#4c9f38' }}>T</span>
          <span style={{ color: '#c5192d' }}>E</span>
          <span style={{ color: '#ff3a21' }}>R</span>
          <span style={{ color: '#26bde2' }}>A</span>
          <span style={{ color: '#fcc30b' }}>C</span>
          <span style={{ color: '#a21942' }}>T</span>
          <span style={{ color: '#fd6925' }}>I</span>
          <span style={{ color: '#dd1367' }}>V</span>
          <span style={{ color: '#fd9d24' }}>E</span>
          <span>&nbsp;</span> {/* Space between words */}
          <span style={{ color: '#0a97d9' }}>M</span>
          <span style={{ color: '#56c02b' }}>A</span>
          <span style={{ color: '#19486a' }}>P</span>
          <span style={{ color: '#8f1838' }}>S</span>
        </h1>
      </div>
      <div className="menu" id="menuToggle" onClick={() => setNavOpen(!navOpen)} style={{ marginLeft: 'auto' }}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', listStyle: 'none', margin: '0', padding: '0' }}>
        <li style={{ margin: '0 15px' }}>
          <NavLink to="/" onClick={() => setNavOpen(false)}>
            <span style={{ color: '#e5243b', fontSize: '22px', fontWeight: 'bold' }}>Interactive Map</span>
          </NavLink>
        </li>
        <li style={{ margin: '0 15px' }}>
          <NavLink to="/ranking" onClick={() => setNavOpen(false)}>
            <span style={{ color: '#dda63a', fontSize: '22px', fontWeight: 'bold' }}>Ranking</span>
          </NavLink>
        </li>
        <li style={{ margin: '0 15px' }}>
          <NavLink to="/compare" onClick={() => setNavOpen(false)}>
            <span style={{ color: '#4c9f38', fontSize: '22px', fontWeight: 'bold' }}>Compare</span>
          </NavLink>
        </li>
        <li style={{ margin: '0 15px' }}>
          <NavLink to="/sdgs" onClick={() => setNavOpen(false)}>
            <span style={{ color: '#26bde2', fontSize: '22px', fontWeight: 'bold' }}>SDGs</span>
          </NavLink>
        </li>
        <li style={{ margin: '0 15px' }}>
          <NavLink to="/about" onClick={() => setNavOpen(false)}>
            <span style={{ color: '#0a97d9', fontSize: '22px', fontWeight: 'bold' }}>About</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
