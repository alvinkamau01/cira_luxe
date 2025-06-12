import React from "react";
import Navigationbar from "./navbar";
import ProductOverlay from "./productoverlay";
import "./css/landingpage.css"; // Importing the CSS file

export default function LandingPage() {
  return (
    <div>
      {/* Include Navbar Component */}
      <Navigationbar />

      {/* Hero Section (Adjusted for Fixed Header) */}
      <div className="hero-section pt-5 mt-5">
        <div className="container cont1">
          <div className="badge bg-white text-pink shadow-sm py-2 px-3 mb-3">
            <a href="#" className="text-decoration-none text-pink">
              New Collection Launch &rarr;
            </a>
          </div>
          <h1 className="display-4 font-serif text-dark">
            Elegance in Every Detail
          </h1>
          <p className="lead text-muted">
            Discover timeless pieces that celebrate feminine beauty and grace.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <a
              href="./shop"
              className="btn btn-pink btn-lg text-white shadow hover-shadow"
            >
              Shop Collection
            </a>
            <a href="#" className="btn btn-link text-pink">
              Learn more &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Product Collection Section */}
      <section className="product-section py-5">
        <ProductOverlay />
      </section>

      {/* Footer */}
      <footer className="bg-light py-4 text-center">
        <div className="container">
          <p className="mb-0">&copy; 2025 Your Brand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
