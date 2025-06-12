// Navbar.js
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./css/landingpage.css";

const navigation = [
  { name: "Home", href: "./" },
  { name: <FaShoppingCart/>, href: "./shop" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="position-fixed w-100 top-0 start-0 z-3"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 20px 20px',
        transition: 'all 0.5s ease',
      }}
    >
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <a href="/" className="text-decoration-none">
          <img
            alt="Brand Logo"
            src="/images/your-feminine-logo.svg"
            className="img-fluid"
            style={{ maxHeight: "50px", opacity: 1, objectFit: 'contain' }}
            width={150}
            height={50}
            loading="lazy"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="d-none d-lg-flex align-items-center gap-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-decoration-none text-secondary hover-pink"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="btn btn-outline-danger d-lg-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="d-lg-none position-absolute w-100 bg-white shadow-sm">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="d-block py-2 px-3 text-decoration-none text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
