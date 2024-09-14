import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/SideBar.css';


function Sidebar({ categories, onCategorySelect,onShopClick }) {
  return (
    <div className="sidebar">
      <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
      <NavLink to="/cart" activeClassName="active-link">Cart</NavLink>
      <NavLink to="/shop" activeClassName="active-link" onClick={onShopClick}>Shop</NavLink>
      <div className="categories">
        <h3>Categories</h3>
        {categories.map((category) => (
          <div
            key={category}
            className="category"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
