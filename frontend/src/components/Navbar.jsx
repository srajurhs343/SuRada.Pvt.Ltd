// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar
 * - shows brand name "SuRada"
 * - main navigation buttons (Home, Retail, Wholesale)
 * - search bar with search icon
 * - cart, login, register, admin buttons
 */
const Navbar = ({ search, setSearch, cart }) => {
  // 1) calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  // 2) style: big buttons on the left (Home / Retail / Wholesale)
  const navButtonStyle = {
    padding: "8px 18px",        // space inside button
    borderRadius: "8px",        // rounded corners
    border: "3px solid #cf7c10",// orange border
    fontWeight: "700",          // bold
    fontSize: "18px",           // big text
    textDecoration: "none",     // no underline
    color: "#1d4ed8",           // blue text
    backgroundColor: "white",   // white background
  };

  // 3) style: smaller buttons on the right (Login / Register / Admin)
  const smallButtonStyle = {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "2px solid #1f2933",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "none",
    color: "#1f2933",
    backgroundColor: "white",
  };

  // 4) style: cart button (starts from smallButtonStyle but dark)
  const cartButtonStyle = {
    ...smallButtonStyle,        // copy all properties above
    backgroundColor: "#000",    // override to black background
    color: "white",             // white text
    borderColor: "#000",        // black border
  };

  // 5) render navbar
  return (
    <nav
      style={{
        // make navbar always visible on top
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,

        padding: "10px",
        backgroundColor: "#14b21113",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* LEFT SIDE: brand + main navigation buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* 5a) Brand / company name */}
        <span
          style={{
            fontSize: "32px",
            fontWeight: 1000,
            color: "#640977",
            letterSpacing: "1px",
          }}
        >
          SuRada
        </span>

        {/* 5b) Main nav buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link to="/" style={navButtonStyle}>
            Home
          </Link>
          <Link to="/retail" style={navButtonStyle}>
            Retail
          </Link>
          <Link to="/wholesale" style={navButtonStyle}>
            Wholesale
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: search bar + cart + auth buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* 5c) Search bar with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid #ccc",
            backgroundColor: "white",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 10px",
              border: "none",
              outline: "none",
              width: "320px",
            }}
          />
          <button
            type="button"
            style={{
              padding: "6px 10px",
              border: "none",
              backgroundColor: "#ff9900", // orange search button
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🔍
          </button>
        </div>

        {/* 5d) Cart button with item count */}
        <Link to="/cart" style={cartButtonStyle}>
          🛒 Cart ({totalItems})
        </Link>

        {/* 5e) Auth / admin buttons */}
        <Link to="/login" style={smallButtonStyle}>
          Login
        </Link>
        <Link to="/register" style={smallButtonStyle}>
          Register
        </Link>
        <Link to="/admin" style={smallButtonStyle}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
