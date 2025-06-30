// src/pages/LoginPage.jsx
import React from "react";
import loginImage from "../assets/loginpage.png"; // Adjust path based on your project
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 relative">
        <img
          src={loginImage}
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-black text-white">
        <div className="w-3/4 max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-center">
            Are you new?{" "}
            <Link to="/signup" className="text-orange-400 underline">
              Create new account
            </Link>
          </p>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-white text-lg italic" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-full bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-lg italic" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-full bg-white text-black pr-10"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-black opacity-70">
                  👁️‍🗨️
                </span>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-orange-400 text-sm">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
