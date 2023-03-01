import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="navbar">
      <h1>OUR WEBSITE</h1>
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link to="PATH TO MENS PRODUCT PAGE">Mens</Link>
            <Link to="PATH TO WOMENS PRODUCT PAGE">Womens</Link>
            <Link to="/home">Home</Link>
            <input
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={searchInput}
            />
            <Link to="PATH TO SHOPPING CART">Shopping Cart</Link>
            <Link to="PATH TO USER LOGIN">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
