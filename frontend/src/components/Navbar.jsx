import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; // Adjust path as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
      <div className="site-title" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Restaurant Logo" className="logo" />
        <div style={{ marginTop: '37.5px' }}>
  <div style={{
    fontSize: '32px',
    fontWeight: '400', // more lean
    fontFamily: 'Segoe UI, sans-serif',
    letterSpacing: '-0.5px'
  }}>
    <span style={{ color: '#007bff' }}>DEEP </span>
    <span style={{ color: '#fff' }}>NET</span>
  </div>
  <div style={{
    fontSize: '32px',
    fontWeight: '400', // more lean
    color: '#aaa',
    fontFamily: 'Segoe UI, sans-serif',
    marginTop: '-10px'
  }}>
    SOFT
  </div>
</div>

</div>


        <ul className="nav-list" style={{ letterSpacing: '-1px' }}>
          <li className="nav-item">
            <a href="/" className="nav-link">HOME</a>
          </li>
          <li className="nav-item">
            <a href="/menu" className="nav-link">MENU</a>
          </li>
          <li className="nav-item">
            <a href="/reservation" className="nav-link">MAKE A RESERVATION</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">CONTACT US</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;