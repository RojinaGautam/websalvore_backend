import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // icons
import { Link } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";

// Adjust the import path as needed or just use <img> with src string if you prefer
import signupImage from "../assets/loginpage.png"; // Adjust path based on your project structure

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    // Handle registration logic here
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Left Side: Image */}
      <div className="w-1/2 relative">
        <img
          src={signupImage}
          alt="Signup Visual"
          className="w-full h-full object-cover"
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Right Side: Form */}
      <div className="w-1/2 flex items-center justify-center relative overflow-hidden">
        {/* Layout Background Image */}
        <img
          src={backgroundImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover blur-md z-0"
          style={{ filter: 'blur(4px)' }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="w-4/5 max-w-lg space-y-6 relative z-10 text-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Register</h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-lg">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-full bg-white/95 text-black"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-full bg-white/95 text-black"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-lg">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-full bg-white/95 text-black"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-full bg-white/95 text-black"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-lg">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password"
                  className="w-full px-4 py-3 rounded-full bg-white/95 text-black pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? EyeOpen : EyeClosed}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-6">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-orange-400 underline">
                Login
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
