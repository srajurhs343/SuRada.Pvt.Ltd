// ---------------------------------------------
// Home.jsx — Clean Homepage (No Product Cards)
// ---------------------------------------------
// This page shows a banner, category boxes, and CTAs.
// It does NOT fetch or display products.
// ---------------------------------------------

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">

      {/* -------------------------------------------------
          1. FULL-WIDTH BANNER
         ------------------------------------------------- */}
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow">
        <img
          src="https://images.unsplash.com/photo-1502720705749-3c42b6a96f12?q=80"
          alt="Fresh fish banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* -------------------------------------------------
          2. WELCOME TITLE
         ------------------------------------------------- */}
      <h1 className="text-3xl md:text-4xl font-extrabold mt-8">
        Welcome to SuRada 
      </h1>
      <p className="text-gray-600 mt-2 text-lg">
        Fresh, Quality, Trusted — Delivered to Retail & Wholesale Buyers
      </p>

      {/* -------------------------------------------------
          3. CATEGORY SELECTION
         ------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        {/* Retail */}
        <Link to="/retail">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-white">
            <h2 className="text-2xl font-bold mb-2">Retail Shop</h2>
            <p className="text-gray-600">
              Buy small quantities — fresh seafood delivered to your home.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Shop Retail
            </button>
          </div>
        </Link>

        {/* Wholesale */}
        <Link to="/wholesale">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-white">
            <h2 className="text-2xl font-bold mb-2">Wholesale Market</h2>
            <p className="text-gray-600">
              Bulk buying for hotels, traders, and businesses.
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Shop Wholesale
            </button>
          </div>
        </Link>
      </div>

      {/* -------------------------------------------------
          4. ABOUT SECTION
         ------------------------------------------------- */}
      <div className="mt-12 p-6 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-bold">Why SuRada Fish?</h2>

        <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
          <li>Direct sourcing from trusted fishermen</li>
          <li>Fresh, hygienic, and high-quality seafood</li>
          <li>Fast delivery and guaranteed freshness</li>
          <li>Retail + Wholesale pricing available</li>
        </ul>
      </div>

    </div>
  );
};

export default Home;
