import { Link } from "react-router-dom";

function CartPage({ cart, setCart }) {
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">
        <button
          style={{
            background: "#333",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          ⬅ Back to Products
        </button>
      </Link>

      <h1>🛒 Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item._id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <div>
                  <strong>{item.name}</strong> (${item.price}) × {item.qty} = $
                  {item.price * item.qty}
                </div>
                <div>
                  <button
                    onClick={() => increaseQty(item._id)}
                    style={{
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      marginRight: "5px",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQty(item._id)}
                    style={{
                      background: "#FFA000",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      marginRight: "5px",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "#E53935",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={clearCart}
            style={{
              background: "#000",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
          <Link to="/checkout">
  <button
    style={{
      background: "#4CAF50",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    Proceed to Checkout 💳
  </button>
</Link>

        </>
      )}
    </div>
  );
}

export default CartPage;
