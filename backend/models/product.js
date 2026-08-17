import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },    // Retail price
    image: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },

    // ⭐ Wholesale Discount (e.g., 15% means customer pays 85% of retail price)
    wholesaleDiscount: { type: Number, default: 15 }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
