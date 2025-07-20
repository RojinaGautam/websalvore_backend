import { UserIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png"; // Adjust path based on your folder structure
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react"; // <-- Add Star icon
import { useState } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowDropdown(false);
    window.location.reload(); // or use navigate if you want to redirect
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed top-0 w-full flex items-center justify-between z-50">
      <img
        src={logo}
        alt="Company Logo"
        style={{ width: '60px', height: '60px' }}
      />

      {/* 🔹 Navbar Section (right) */}
      <nav className="w-[60%] h-16 bg-[#ca3d2a] rounded-l-full flex items-center justify-between px-8 shadow-lg">
        <ul className="flex gap-8 text-white font-semibold text-sm md:text-base">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/menu">MENU</Link></li>
          <li><Link to="/visit-us">VISIT US</Link></li>
        </ul>

        <div className="flex items-center gap-4 relative">
          {/* 🟨 Make Reservation Button */}
          <Link
            to="/reservation"
            className="bg-white text-[#ca3d2a] font-semibold px-4 py-1 rounded-full hover:bg-[#fff0ee] transition duration-300 text-sm"
          >
            Make Reservation
          </Link>

          {/* Review Icon */}
          <Link
            to="/testimonial"
            className="text-white p-2 rounded-full hover:bg-white hover:text-[#ca3d2a] transition duration-300 inline-flex items-center justify-center"
            aria-label="Reviews"
          >
            <Star className="w-6 h-6" />
          </Link>

          {/* Profile Icon or User Name/Initials */}
          {user ? (
            <div className="relative">
              <button
                className="text-white bg-[#ca3d2a] p-2 rounded-full hover:bg-white hover:text-[#ca3d2a] transition duration-300 inline-flex items-center justify-center font-bold text-lg"
                aria-label="User Menu"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {user.name.length > 2 ? getInitials(user.name) : user.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-[#ca3d2a] rounded shadow-lg py-2 w-32 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#fff0ee]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white p-2 rounded-full hover:bg-white hover:text-[#ca3d2a] transition duration-300 inline-flex items-center justify-center"
              aria-label="Login"
            >
              <UserIcon className="w-6 h-6" />
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            to="/addtocart"
            className="text-white p-2 rounded-full hover:bg-white hover:text-[#ca3d2a] transition duration-300 inline-flex items-center justify-center"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
