import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage({ cart, setCart }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address) {
      alert("Please fill in all details.");
      return;
    }

    const orderDetails = {
      name,
      address,
      payment,
      total: totalPrice,
      items: cart,
    };

    console.log("Order Submitted:", orderDetails);

    alert("🎉 Order placed successfully!");
    setCart([]); // clear cart after checkout
    navigate("/"); // redirect back to home
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your cart is empty</h2>
        <Link to="/">
          <button
            style={{
              background: "#333",
              color: "white",
              padding: "10px 15px",
              borderRadius: "6px",
            }}
          >
            Go Back to Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Link to="/cart">
        <button
          style={{
            background: "#333",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          ⬅ Back to Cart
        </button>
      </Link>

      <h1>Checkout 🧾</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Name:</strong>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Address:</strong>
            <br />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Payment Method:</strong>
            <br />
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
              }}
            >
              <option>Cash on Delivery</option>
              <option>Credit/Debit Card</option>
              <option>UPI</option>
            </select>
          </label>
        </div>

        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
