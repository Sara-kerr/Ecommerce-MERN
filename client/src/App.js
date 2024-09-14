import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import "./components/CheckoutForm";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

import CheckoutForm from "./components/CheckoutForm";
import Home from "./pages/Home";
import { CheckOut } from "./pages/CheckOut";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";

import { CartProvider } from "./context/CartContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["T-Shirts", "Jeans", "Jackets", "Shoes","Bags"];

  const resetCategory = () => {
    setSelectedCategory("All");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <CartProvider>
      <Router>
        <Header onSearch={handleSearch} />

        <div className="main-content">
          <SideBar
            categories={categories}
            onCategorySelect={setSelectedCategory}
            onShopClick={resetCategory}
          />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productDetails/:id" element={<ProductDetail />} />

              <Route path="/checkingOut" element={<CheckOut />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/Shop"
                element={
                  <Shop
                    selectedCategory={selectedCategory}
                    searchTerm={searchTerm}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
