import React from "react";
import { useCart } from "../context/CartContext"; 
import "../css/Cart.css"; 
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkingOut"); // Navigate to the checkout page
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    // console.log("Removing item with ID:", productId); 
    removeFromCart(productId);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price} DZD</span>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total:</strong> {calculateTotal()} DZD
          </div>
          <div className="cart-actions">
            <button className="clear-cart-button" onClick={() => clearCart()}>
              Clear Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
