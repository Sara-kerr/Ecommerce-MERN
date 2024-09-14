import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
// import { products } from "../data";
import "../css/ProductDetail.css"; 
import Modal from "../components/Modal"; 
import axiosInstance from "../axiosConfig";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`);
        setProduct(response.data); // Set the product data
        // console.log(response.data);

      } catch (err) {
        console.error("Error fetching product:", err);
        setError(`Error fetching product: ${err.message}`);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [id]); // Depend on `id` 




  const handleAddToCart = () => {
    console.log("Add to Cart button clicked");
    console.log("Product isStocked:", product.isStocked);
    if (product.isStocked) {
      addToCart(product);
    } else {
      console.log("Opening modal");
      setIsModalOpen(true); // Open the modal if out of stock
    }
  };

  const closeModal = () => setIsModalOpen(false);

  // Show loading or error messages 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>
        <strong>Price:</strong> {product.price} DZD
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Description:</strong> This is a detailed description of{" "}
        {product.name}.
      </p>
      <p>
        <strong>Stock Status:</strong>{" "}
        {product.isStocked ? "In Stock" : "Out of Stock"}
      </p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button
        className="continue-shopping-button"
        onClick={() => window.history.back()}
      >
        Continue Shopping
      </button>

    
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Out of Stock</h3>
        <p>
          This product is currently out of stock and cannot be added to the
          cart.
        </p>
      </Modal>
    </div>
  );
}

export default ProductDetail;
