import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "./Tiger Agro Chem log.png";

const navItems = [
  { to: "/products", label: "Products" },
  { to: "/guidelines", label: "Crop Protection Scheme" },
  { to: "/events", label: "Events" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand - Far Left */}
        <div className="navbar-brand-wrapper">
          <NavLink to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Tiger Agro Chem logo"
              className="navbar-logo"
            />
            <div className="navbar-brand-text">
              <h1 className="navbar-title">Tiger Agrochem</h1>
              <p className="navbar-tagline">Agricultural Excellence</p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation - Centered and evenly spaced */}
        <div className="navbar-desktop-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "navbar-link navbar-link-active"
                  : "navbar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Admin Button - Far Right */}
        <div className="navbar-admin-wrapper">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "navbar-link-admin navbar-link-admin-active"
                : "navbar-link-admin"
            }
          >
            Admin
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-mobile-toggle">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="navbar-toggle-btn"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? "navbar-mobile-menu-open" : ""}`}>
        <div className="navbar-mobile-menu-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "navbar-mobile-link navbar-mobile-link-active"
                  : "navbar-mobile-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "navbar-mobile-link-admin navbar-mobile-link-admin-active"
                : "navbar-mobile-link-admin"
            }
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;