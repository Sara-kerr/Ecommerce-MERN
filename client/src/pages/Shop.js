import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import "../css/Shop.css";
import "../css/Pagination.css";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal"; 
import axiosInstance from "../axiosConfig";

function Shop({ selectedCategory, searchTerm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [products, setProducts] = useState([]); // New state to store products
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  const { addToCart } = useCart();



  // Function to fetch products from the API
  const fetchProducts = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/product?page=${page}`);
      setProducts(response.data.products); // Update products state
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Fetch products on component mount and page change
  useEffect(() => {
    fetchProducts(currentPage); // Fetch products for the current page
  }, [currentPage]);

  // Fetch products by category from the API
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        let endpoint = `/product`;

        // Check if category is provided
        if (selectedCategory && selectedCategory !== "All") {
          endpoint += `?category=${selectedCategory}`;
        }

        const response = await axiosInstance.get(endpoint); // Fetch products by category
        setProducts(response.data.products); // Store fetched products
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  const handleAddToCart = (product) => {
    if (product.isStocked) {
      addToCart(product);
    } else {
      setModalMessage(`The product ${product.name} is out of stock.`);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Show loading or error messages if necessary
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="shop">
      <h2>Our Products</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Out of Stock</h3>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default Shop;
