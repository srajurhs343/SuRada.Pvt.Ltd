import React, { useEffect, useState } from "react";
import axios from "axios";

const Shop = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add to cart with options
  const addToCart = (product, cleaning, qty) => {
    const exist = cart.find(
      (item) =>
        item._id === product._id &&
        item.cleaning === cleaning
    );

    const priceWithCleaning =
      product.name.toLowerCase().includes("prawn") ||
      product.name.toLowerCase().includes("shrimp")
        ? product.price + (cleaning ? 30 : 0)
        : product.price + (cleaning ? 20 : 0);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id && item.cleaning === cleaning
            ? { ...item, qty: item.qty + qty, price: priceWithCleaning }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...product, cleaning, qty, price: priceWithCleaning },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🐟 suRada Fish Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => {
          const [qty, setQty] = useState(1);
          const [cleaning, setCleaning] = useState(false);

          return (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "220px",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>
                Price: ₹
                {product.name.toLowerCase().includes("prawn") ||
                product.name.toLowerCase().includes("shrimp")
                  ? product.price + (cleaning ? 30 : 0)
                  : product.price + (cleaning ? 20 : 0)}
              </p>

              {/* Cleaning toggle */}
              <div style={{ marginBottom: "8px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={cleaning}
                    onChange={() => setCleaning(!cleaning)}
                  />{" "}
                  Cleaned
                </label>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: "8px" }}>
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  style={{ padding: "2px 6px" }}
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ padding: "2px 6px" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, cleaning, qty)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
