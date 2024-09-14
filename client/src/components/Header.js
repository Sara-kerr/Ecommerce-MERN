// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import SearchBar from "./SearchBar";

function Header({ onSearch }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="header-controls">
        <SearchBar onSearch={onSearch} />
        <button className="contact-button">Contact Us</button>
      </div>
    </header>
  );
}

export default Header;
