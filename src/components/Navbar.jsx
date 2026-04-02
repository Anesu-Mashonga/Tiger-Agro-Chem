import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import logo from "./Tiger Agro Chem log.png";

const navItems = [
  { to: "/products", label: "Products" },
  { to: "/guidelines", label: "Crop protection Scheme" },
  { to: "/events", label: "Events" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/admin", label: "Admin" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Tiger Agro Chem logo"
                className="navbar-logo"
              />
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">
                  Tiger Agrochem
                </h1>
                <p className="text-xs text-emerald-600 font-medium">
                  Agricultural Excellence
                </p>
              </div>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => {
                  if (item.label === "Admin") {
                    return isActive
                      ? "bg-amber-600 text-white px-4 py-2 rounded-full font-semibold"
                      : "bg-amber-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-amber-600 transition";
                  }
                  return isActive
                    ? "text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-gray-600 hover:text-emerald-600 font-medium transition";
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${mobileOpen ? "block" : "hidden"} md:hidden bg-white border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => {
                if (item.label === "Admin") {
                  return isActive
                    ? "block px-3 py-2 text-white font-semibold bg-amber-600 rounded-md"
                    : "block px-3 py-2 text-white bg-amber-500 rounded-md hover:bg-amber-600";
                }
                return isActive
                  ? "block px-3 py-2 text-emerald-700 font-semibold bg-emerald-50 rounded-md"
                  : "block px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-md";
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
