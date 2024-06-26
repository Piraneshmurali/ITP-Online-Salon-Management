import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link
      to={{
        pathname: `/product/${product._id}`,
        state: { product: product }
      }}
      className="product-link"
    >
      <div className="product-card">
        <img src={product.uquantity} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">Rs. {product.totalPrice}</p>
          <p className="product-category">Category: {product.type}</p>
        </div>
      </div>
    </Link>
  );
}
