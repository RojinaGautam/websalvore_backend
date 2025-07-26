// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import loginImage from "../assets/loginpage.png"; // Adjust path based on your project
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";
import { AuthContext } from "../components/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Login failed");
        return;
      }
      // Save token and user info using context
      const payload = JSON.parse(atob(data.data.access_token.split('.')[1]));
      if (payload && payload.user) {
        const userObj = {
          id: payload.user.id,
          name: payload.user.name,
          email: payload.user.email,
          role: payload.user.role
        };
        login(userObj, data.data.access_token); // Use AuthContext
        if (userObj.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        return;
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    try {
      const res = await fetch("http://localhost:4000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotMessage(data.message);
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotEmail("");
          setForgotMessage("");
        }, 3000);
      } else {
        setForgotMessage(data.message || "Failed to submit request");
      }
    } catch (err) {
      setForgotMessage("Network error. Please try again.");
    }
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-white text-lg italic" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-full bg-white text-black"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
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
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-orange-400 text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            {error && <div className="text-red-400 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ca3d2a] rounded-lg p-8 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Forgot Password</h2>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotEmail("");
                  setForgotMessage("");
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Enter your email address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              {forgotMessage && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  forgotMessage.includes("successfully") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {forgotMessage}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail("");
                    setForgotMessage("");
                  }}
                  className="flex-1 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#ca3d2a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-white text-[#ca3d2a] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
