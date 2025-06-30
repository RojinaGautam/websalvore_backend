import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // icons
import { Link } from "react-router-dom";

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
      <div className="w-1/2 flex items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ff6b35 0%, transparent 50%), 
                                radial-gradient(circle at 75% 75%, #ff6b35 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="w-4/5 max-w-lg space-y-6 relative z-10">
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
