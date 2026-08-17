// src/components/ProductCardWithOptions.jsx
import React, { useState } from "react";

const ProductCardWithOptions = ({
  product,
  addToCart,
  defaultQty = 0.5,
  isWholesale = false,
}) => {
  const [qty, setQty] = useState(defaultQty);
  const [cleaned, setCleaned] = useState(false);

  // extra cost if cleaned
  const cleaningCost =
    product.name.toLowerCase().includes("prawn") ||
    product.name.toLowerCase().includes("shrimp")
      ? 30
      : 20;

  // image URL (local or external)
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  const displayPrice = isWholesale
    ? `₹${product.price} / kg`
    : `₹${product.price}`;

  return (
    <div
      style={{
         border: "8px solid orange", // 👈 thick orange border
        borderRadius: "10px",
        padding: "10px",
        background: "white",
      }}
    >
      {/* Fixed image box – like Admin */}
      <div
        style={{
          width: "100%",
          height: "140px",
          overflow: "hidden",
          borderRadius: "8px",
          background: "#f3f3f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         
        }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // image stays inside the box

          }}
        />
      </div>

      {/* Name */}
      <h2 style={{ fontSize: "20px", fontWeight: "700", marginTop: "8px", color: "#1f2933", textDecoration: "underline" }}>
        {product.name}
      </h2>

      {/* Price */}
      <p style={{ fontSize: "16px", margin: "4px 0", color: "#1de14bff", fontWeight: "600" }} >{displayPrice}</p>

      {/* Quantity select */}
      <div style={{ marginTop: "6px", fontSize: "13px" }}>
        <label style={{ marginRight: "4px", fontWeight: "600", color: "#111827"}}>Qty:</label>
        <select
          value={qty}
          onChange={(e) => setQty(parseFloat(e.target.value))}
          style={{
      fontSize: "13px",
      padding: "2px 4px",
    }}
        >
          {isWholesale ? (
            <>
              <option value={5}>5 kg</option>
              <option value={10}>10 kg</option>
              <option value={20}>20 kg</option>
            </>
          ) : (
            <>
              <option value={0.5}>0.5 kg</option>
              <option value={1}>1 kg</option>
              <option value={2}>2 kg</option>
            </>
          )}
        </select>
      </div>

      {/* Cleaned checkbox */}
      <div style={{ marginTop: "6px", fontSize: "12px" }}>
        <label>
          <input
            type="checkbox"
            checked={cleaned}
            onChange={() => setCleaned(!cleaned)}
          />{" "}
          Cleaned (+₹{cleaningCost})
        </label>
      </div>

      {/* Add to cart button */}
      <button
        onClick={() => addToCart(product, qty, cleaned)}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "6px 0",
          borderRadius: "6px",
          border: "none",
          color: "white",
          fontSize: "12px",
          cursor: "pointer",
          background: isWholesale ? "#16a34a" : "#2563eb",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCardWithOptions;
