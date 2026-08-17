import { useEffect, useState } from "react";
import API from "./api";
import { Link } from "react-router-dom";

function ProductsPage({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Surada Products 🐟</h1>
      <Link to="/cart">
        <button
          style={{
            background: "#333",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          🛒 View Cart ({cart.length})
        </button>
      </Link>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "220px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  style={{ width: "100%" }}
/>

            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: "#ff4444",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
