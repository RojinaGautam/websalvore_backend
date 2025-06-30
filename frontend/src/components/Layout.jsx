// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import backgroundImg from "../assets/background.jpg"; // Adjust path as needed

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* 🔹 Blurred background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={backgroundImg}
          alt="Background"
          className="w-full h-full object-cover blur-md"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔹 Foreground content */}
      <div className="relative z-10 pt-16">
        {children}
      </div>
    </div>
  );
}
