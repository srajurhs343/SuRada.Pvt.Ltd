// src/pages/Wholesale.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardWithOptions from "../components/ProductCardWithOptions";

const Wholesale = ({ cart, setCart, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // add to cart with bulk discount
  const addToCart = (product, qty, cleaned) => {
    let price = product.price;
    if (cleaned) {
      price +=
        product.name.toLowerCase().includes("prawn") ||
        product.name.toLowerCase().includes("shrimp")
          ? 30
          : 20;
    }

    if (qty >= 10) price *= 0.8;
    else if (qty >= 5) price *= 0.9;

    const exist = cart.find(
      (item) => item._id === product._id && item.cleaned === cleaned
    );
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id && item.cleaned === cleaned
            ? { ...item, qty: item.qty + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty, cleaned, price }]);
    }
  };

  if (loading) return <p style={{ padding: 24, fontSize: 18 }}>Loading products...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
        Wholesale Products 🐟
      </h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {products
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <div key={product._id} style={{ width: 270 }}>
                <ProductCardWithOptions
                  product={product}
                  addToCart={addToCart}
                  defaultQty={5}
                  isWholesale={true}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Wholesale;
