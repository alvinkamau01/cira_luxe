"use client"

import { useSelector } from "react-redux"
import { ShoppingCart, Menu, X, Home, Info, Facebook, Instagram, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

const NavBar = ({cartGlow, onCartClick}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const numOfItems = useSelector((state) => state.basket.itemsInBasket)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isMenuOpen])

  const cartIconClasses = `h-6 w-6 transition-all duration-300 ${
    cartGlow ? "text-yellow-500 animate-pulse" : 
    numOfItems > 0 ? "text-rose-500" : "text-rose-600"
  }`;


  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-gradient-rose-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <img src="/placeholder.svg" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover" />
            </div>
            <span className="font-bold text-lg md:text-xl text-rose-700 hidden sm:inline-block">Your Brand</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="flex items-center px-4 py-2 rounded-full text-rose-700 font-medium hover:bg-white/70 hover:text-rose-500 transition-all duration-200">
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </a>
          </div>

          {/* Cart & Social Icons */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <a href="/checkout" onClick={onCartClick} className="relative p-2 rounded-full hover:bg-white/70 transition-colors duration-200">
              <ShoppingCart className={cartIconClasses} />
              {numOfItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {numOfItems}
                </span>
              )}
            </a>

            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <a href="https://www.facebook.com" target="_blank" className="p-2 rounded-full hover:bg-white/70 text-rose-600 hover:text-rose-500 transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" className="p-2 rounded-full hover:bg-white/70 text-rose-600 hover:text-rose-500 transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/+254706552803" target="_blank" className="p-2 rounded-full hover:bg-white/70 text-rose-600 hover:text-rose-500 transition-all duration-200">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-white/70 text-rose-600 hover:text-rose-500 transition-all duration-200">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-pink-50/95 backdrop-blur-sm flex flex-col justify-center items-center transition-all duration-300">
          <div className="absolute top-4 right-4">
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-white/80 text-rose-500 hover:bg-white hover:text-rose-600 transition-all duration-200 shadow-md">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="w-4/5 max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-rose-200 to-pink-200 p-6">
              <h2 className="text-2xl font-bold text-rose-700">Menu</h2>
              <p className="text-rose-600 text-sm mt-1">Explore our pages</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-3">
                <a href="/" className="flex items-center space-x-3 text-gray-700 hover:text-rose-500 p-2 rounded-lg hover:bg-pink-50 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Home</span>
                </a>
                <a href="/philosophypage" className="flex items-center space-x-3 text-gray-700 hover:text-rose-500 p-2 rounded-lg hover:bg-pink-50 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                  <Info className="h-5 w-5" />
                  <span className="font-medium">About</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 md:h-20"></div>
    </nav>
  )
}

export default NavBar
