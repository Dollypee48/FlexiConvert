import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  const isActive = (path) =>
    location.pathname === path
      ? "text-white underline underline-offset-4"
      : "text-blue-100 hover:text-white";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/convert", label: "Converters" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="bg-[#0a1d42] shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wider"
        >
          Flexi<span className="text-blue-300">Convert</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${isActive(
                to
              )} text-lg font-medium transition duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {mobileOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a1d42] border-t border-blue-800">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`${isActive(
                  to
                )} text-lg font-medium transition duration-300`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
