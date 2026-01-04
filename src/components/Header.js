import React, { useContext, useState } from "react";
import log from "./logo1.png";
import { Heart, ShoppingCart, User, PlusSquare, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserContext from "../Users/Context/UserContext";

const Header = () => {
  const { loggedin, setLoggedin, isFarmer, setFarmer, isUser, setUser } =
    useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setLoggedin(false);
    if (isFarmer) setFarmer(false);
    if (isUser) setUser(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={log}
            alt="FarmToTable Logo"
            className="h-12 w-auto drop-shadow-md"
          />
          <span className="text-white font-extrabold text-2xl tracking-wide select-none drop-shadow-lg">
            FarmToTable
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-semibold text-white text-lg tracking-wide">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/Shop"
            className="hover:text-yellow-300 transition duration-300"
          >
            Shop
          </Link>
          <Link
            to="/about-us"
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/Contactus"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/Adminform"
            className="hover:text-yellow-300 transition duration-300"
          >
            Admin
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-6">
          {loggedin ? (
            isFarmer ? (
              <div className="flex items-center space-x-6">
                <Link
                  to="/UserProfile"
                  className="text-white hover:text-yellow-300 transition transform hover:scale-110"
                >
                  <User size={24} />
                </Link>
                <Link
                  to="/addproducts"
                  title="Add Product"
                  className="text-white hover:text-yellow-300 transition transform hover:scale-110"
                >
                  <PlusSquare size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/Wishlist"
                  className="text-white hover:text-yellow-300 transition transform hover:scale-110"
                >
                  <Heart size={24} />
                </Link>
                <Link
                  to="/Cart"
                  className="text-white hover:text-yellow-300 transition transform hover:scale-110"
                >
                  <ShoppingCart size={24} />
                </Link>
                <Link
                  to="/UserProfile"
                  className="text-white hover:text-yellow-300 transition transform hover:scale-110"
                >
                  <User size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
                >
                  Sign Out
                </button>
              </div>
            )
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-5 py-2 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-teal-600 transition shadow-md"
              >
                Login
              </Link>
              <Link
                to="/signin"
                className="px-5 py-2 rounded-full font-semibold bg-yellow-400 text-teal-900 hover:bg-yellow-500 transition shadow-md"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gradient-to-b from-green-500 via-teal-500 to-cyan-500 px-6 pb-6 space-y-4 shadow-inner">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Home
          </Link>
          <Link
            to="/Shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Shop
          </Link>
          <Link
            to="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            About Us
          </Link>
          <Link
            to="/Contactus"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Contact Us
          </Link>
          <Link
            to="/Adminform"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Admin
          </Link>

          <hr className="border-yellow-300/50 my-4" />

          {loggedin ? (
            isFarmer ? (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/UserProfile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                >
                  <User size={24} /> <span>Profile</span>
                </Link>
                <Link
                  to="/addproducts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                >
                  <PlusSquare size={24} /> <span>Add Product</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/Wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                >
                  <Heart size={24} /> <span>Wishlist</span>
                </Link>
                <Link
                  to="/Cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                >
                  <ShoppingCart size={24} /> <span>Cart</span>
                </Link>
                <Link
                  to="/UserProfile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
                >
                  <User size={24} /> <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition"
                >
                  Sign Out
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-teal-600 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-full font-semibold bg-yellow-400 text-teal-900 hover:bg-yellow-500 transition text-center"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
