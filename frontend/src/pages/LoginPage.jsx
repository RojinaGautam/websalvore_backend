// src/pages/LoginPage.jsx
import React, { useState } from "react";
import loginImage from "../assets/loginpage.png"; // Adjust path based on your project
import { Link } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // SVGs for eye open and eye closed
  const EyeOpen = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
    </svg>
  );
  const EyeClosed = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 1l22 22" />
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6 0-10-7-10-7a21.81 21.81 0 0 1 5.06-5.94M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
      <path d="M22 12s-4-7-10-7a10.94 10.94 0 0 0-4.12.94" />
    </svg>
  );

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
      <div className="w-1/2 flex items-center justify-center relative overflow-hidden">
        {/* Layout Background Image */}
        <img
          src={backgroundImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover blur-md z-0"
          style={{ filter: 'blur(4px)' }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="w-3/4 max-w-md space-y-6 relative z-10 text-white">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-center">
            Are you new?{" "}
            <Link to="/signup" className="text-orange-400 underline">
              Create new account
            </Link>
          </p>
          <form className="space-y-4">
            {/* Email */}
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
            {/* Password */}
            <div>
              <label className="block mb-1 text-white text-lg italic" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 rounded-full bg-white text-black pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-black opacity-70"
                  tabIndex={-1}
                >
                  {showPassword ? EyeOpen : EyeClosed}
                </button>
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
