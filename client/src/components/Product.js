import React from "react";
import { Link } from "react-router-dom";
import "../css/Shop.css";
import { useCart } from "../context/CartContext";

function Product({ product, onAddToCart }) {
  return (
    <div key={product.id} className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price} DZD</p>
        <button
          onClick={() => onAddToCart(product)}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
        <Link
          to={`/productDetails/${product._id}`}
          className="more-details-button"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}

export default Product;
