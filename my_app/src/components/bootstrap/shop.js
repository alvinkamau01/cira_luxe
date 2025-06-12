import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import "./css/shop.css"; // Importing the CSS file

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // Add more products as needed
];

export default function Shop() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/productpage");
  };

  return (
    <div className="shop-container">
      <NavBar/>
      <h2 className="shop-title">Customers Also Purchased</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={handleClick}
          >
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="product-image"
            />
            <div className="product-info">
              <a href={product.href} className="product-name">
                {product.name}
              </a>
              <p className="product-color">{product.color}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
