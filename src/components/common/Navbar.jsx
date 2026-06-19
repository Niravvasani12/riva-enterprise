import { useState } from "react";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // 👈 add your logo here

const navLinkClass = ({ isActive }) =>
  `transition hover:text-green-400 ${
    isActive ? "text-green-400" : "text-white"
  }`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/70 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* 🔥 LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Riva Logo"
            className="h-12 w-auto object-contain"
          />
          <span to="/" className="text-2xl font-bold text-green-400">
            {" "}
            Riva DTF
          </span>
        </Link>

        {/* 💻 DESKTOP MENU */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/price-listing-best" className={navLinkClass}>
            Price Listing Best
          </NavLink>{" "}
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* 💻 DESKTOP WHATSAPP */}
        <a
          href="https://wa.me/918000572371"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-black transition hover:bg-green-400"
        >
          <FaWhatsapp />
          WhatsApp
        </a>

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 MOBILE MENU (ANIMATED) */}
      <div
        className={`md:hidden absolute left-0 top-full w-full bg-black/95 backdrop-blur-md border-t border-gray-800 transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/price-listing-best"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Price Listing Best
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>

          {/* WhatsApp inside menu (not top) */}
          {/* <a
            href="https://wa.me/91"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium text-black transition hover:bg-green-400"
          >
            <FaWhatsapp />
            WhatsApp
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
