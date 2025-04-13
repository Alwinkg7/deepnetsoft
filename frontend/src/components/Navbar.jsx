import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-title-container">
          <div className="logo-container">
            <img src={logo} alt="Restaurant Logo" className="logo" />
          </div>
          <div className="site-title">
            <div className="title-line">
              <span className="blue-text">DEEP </span>
              <span className="white-text">NET</span>
            </div>
            <div className="subtitle">SOFT</div>
          </div>
        </div>

        <div 
          className="mobile-menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/home" className="nav-link">HOME</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">MENU</a>
          </li>
          <li className="nav-item">
            <a href="/reservation" className="nav-link">RESERVATION</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;