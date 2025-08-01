import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-white" : "text-blue-100 hover:text-white";

  return (
    <header className="bg-[#0a1d42] shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          Flexi<span className="text-blue-300">Convert</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className={`${isActive("/")} text-lg transition duration-200`}>
            Home
          </Link>
          <Link to="/convert" className={`${isActive("/convert")} text-lg transition duration-200`}>
            Converters
          </Link>
        </div>

        <div className="md:hidden">
          <Menu className="text-blue-100" />
        </div>
      </nav>
    </header>
  );
}
