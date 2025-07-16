import { UserIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png"; // Adjust path based on your folder structure
import { Link } from "react-router-dom";

export default function Navbar() {
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
        <div className="flex items-center gap-4">
        <Link
            to="/login"
            className="text-white p-2 rounded-full hover:bg-white hover:text-[#ca3d2a] transition duration-300 inline-flex items-center justify-center"
            aria-label="Login"
            >
            <UserIcon className="w-6 h-6" />
            </Link>
        </div>
      </nav>
    </div>
  );
}
