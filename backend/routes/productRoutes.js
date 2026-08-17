import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------ 🧠 MULTER SETUP FOR IMAGE UPLOAD ------------------ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ------------------ 🟢 GET ALL PRODUCTS ------------------ */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

/* ------------------ 🟢 ADD NEW PRODUCT (Admin Only) ------------------ */
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !imagePath) {
      return res.status(400).json({
        message: "Name, price, and image are required",
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ------------------ 🟡 UPDATE PRODUCT BY ID ------------------ */
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🖼️ Replace image if new one uploaded
    if (req.file) {
      if (product.image && fs.existsSync(`.${product.image}`)) {
        fs.unlinkSync(`.${product.image}`);
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    // 🧩 Update fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (stock) product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error("❌ Update failed:", err);
    res.status(400).json({ message: "Failed to update product" });
  }
});

/* ------------------ 🔴 DELETE PRODUCT BY ID ------------------ */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🧹 Delete image file if exists
    if (product.image && fs.existsSync(`.${product.image}`)) {
      fs.unlinkSync(`.${product.image}`);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
