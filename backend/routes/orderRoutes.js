import express from "express";
import Order from "../models/Order.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();
// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH /api/orders/:id
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Shipped", "Delivered", "Canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Email content
    const subject = `🧾 New Order from ${savedOrder.name}`;
    const message = `
New Order Received:

Customer Name: ${savedOrder.name}
Email: ${savedOrder.email}
Address: ${savedOrder.address}

Total: $${savedOrder.total}

Items:
${savedOrder.cartItems
  .map(
    (item) =>
      `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`
  )
  .join("\n")}
`;

    // ✅ Send email to your own admin Gmail for now
    await sendEmail(
      process.env.EMAIL_USER, // you’ll get the email
      subject,
      message
    );

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
