import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ use your configured API instead of raw axios

const AdminDashboard = () => {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: null,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ---------- PRODUCTS ----------
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleProductChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      await API.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ name: "", price: "", description: "", stock: "", image: null });
      fetchProducts();
      alert("✅ Product added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEditProduct = async (product) => {
    const name = prompt("Name", product.name);
    const price = prompt("Price", product.price);
    const description = prompt("Description", product.description || "");
    const stock = prompt("Stock", product.stock || 0);
    if (name == null) return;
    try {
      await API.put(`/products/${product._id}`, {
        name, price, description, stock,
      });
      fetchProducts();
      alert("✅ Product updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  // ---------- ORDERS ----------
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await API.patch(`/orders/${orderId}`, { status });
      fetchOrders();
      alert("✅ Order status updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  // ---------- RENDER ----------
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("products")} style={{ marginRight: 8 }}>Manage Products</button>
        <button onClick={() => setTab("orders")}>Orders</button>
      </div>

      {tab === "products" && (
        <div>
          <h2>Add Product</h2>
          <form onSubmit={handleProductSubmit} style={{ marginBottom: 20 }}>
            <input name="name" value={formData.name} onChange={handleProductChange} placeholder="Name" required />
            <input name="price" value={formData.price} onChange={handleProductChange} placeholder="Price" required />
            <input name="description" value={formData.description} onChange={handleProductChange} placeholder="Description" />
            <input name="stock" value={formData.stock} onChange={handleProductChange} placeholder="Stock" />
            <input type="file" name="image" onChange={handleProductChange} required />
            <button type="submit">Add Product</button>
          </form>

          <h2>Product List ({products.length})</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {products.map((p) => (
              <div key={p._id} style={{ width: 220, border: "1px solid #ddd", padding: 10 }}>
                <img
                  src={p.image ? `http://localhost:5000${p.image}` : ""}
                  alt={p.name}
                  style={{ width: "100%", height: 120, objectFit: "cover" }}
                />
                <h4>{p.name}</h4>
                <div>Price: ${p.price}</div>
                <div>Stock: {p.stock ?? 0}</div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => handleEditProduct(p)} style={{ marginRight: 6 }}>✏️ Edit</button>
                  <button onClick={() => handleDeleteProduct(p._id)}>❌ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div>
          <h2>Orders ({orders.length})</h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Order {order._id}</strong>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <div><strong>Name:</strong> {order.name}</div>
                  <div><strong>Email:</strong> {order.email}</div>
                  <div><strong>Address:</strong> {order.address}</div>
                  <div><strong>Total:</strong> ${order.total}</div>
                  <div><strong>Status:</strong> {order.status || "Pending"}</div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <h4>Items</h4>
                  <ul>
                    {order.cartItems.map((it, idx) => (
                      <li key={idx}>{it.name} × {it.quantity} = ${it.price * it.quantity}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => handleStatusChange(order._id, "Shipped")} style={{ marginRight: 6 }}>🚚 Shipped</button>
                  <button onClick={() => handleStatusChange(order._id, "Delivered")} style={{ marginRight: 6 }}>✅ Delivered</button>
                  <button onClick={() => handleStatusChange(order._id, "Canceled")}>❌ Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
