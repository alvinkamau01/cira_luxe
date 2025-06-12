import React from "react";
import "./css/landingpage.css"; // Add your custom CSS file for styling

const products = [
  { id: 1, name: "Real Dastome Rouze", image: "/images/product1.png", category: "Lips" },
  { id: 2, name: "Hook Gupe Fixxer", image: "/images/product2.png", category: "Face" },
  { id: 3, name: "Decks Eoff Creme", image: "/images/product3.png", category: "Eyes" },
  { id: 4, name: "Vacanium Fonte", image: "/images/product4.png", category: "Lips" },
  { id: 5, name: "Elegant Glow Serum", image: "/images/product5.png", category: "Face" },
  { id: 6, name: "Luxury Foundation", image: "/images/product6.png", category: "Face" },
];

export default function ProductOverlay() {
  return (
    <div className="overlay-container">
      <div className="content">
        <h2 className="overlay-title">Shop the Collection</h2>
        <p className="overlay-description">
          Explore our exclusive beauty products designed to enhance your style.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
