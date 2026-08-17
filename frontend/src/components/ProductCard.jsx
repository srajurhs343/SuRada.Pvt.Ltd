// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white w-full">
      {/* Image Container (fixed Amazon-style box) */}
      <div className="w-full h-36 bg-gray-100 rounded flex items-center justify-center">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `http://localhost:5000${product.image}`
          }
          alt={product.name}
          className="max-h-28 object-contain rounded"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600 line-clamp-2">
        {product.description}
      </p>

      {/* Price */}
      <p className="mt-1 font-bold text-lg text-red-600">₹{product.price}</p>

      {/* Add to cart */}
      <button className="mt-2 w-full bg-blue-600 text-white py-1 text-sm rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
