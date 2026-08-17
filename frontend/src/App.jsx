// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import Retail from "./pages/Retail";
import Wholesale from "./pages/Wholesale";
import CheckoutPage from "./pages/Checkout";
import CartPage from "./pages/CartPage";

// Components
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <Router>
      {/* paddingTop keeps content below the fixed navbar */}
      <div style={{ paddingTop: "70px" }}>
        {/* Navigation (fixed in Navbar.jsx) */}
        <Navbar search={search} setSearch={setSearch} cart={cart} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route
            path="/retail"
            element={
              <Retail search={search} cart={cart} setCart={setCart} />
            }
          />
          <Route
            path="/wholesale"
            element={
              <Wholesale cart={cart} setCart={setCart} search={search} />
            }
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} setCart={setCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
