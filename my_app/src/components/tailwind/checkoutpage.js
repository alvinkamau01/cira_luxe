"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, checkoutDoc, readCheckoutDoc,deleteCheckoutDoc } from "../../redux/asyncActions";
import { Minus, Plus, X } from "lucide-react";
import Navbar from "./navBar";
import "./css/checkout.css";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsNavVisible(false); // Scrolling down
      } else {
        setIsNavVisible(true); // Scrolling up
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const dispatch = useDispatch();
  const items = useSelector((state) => state.basket.itemsInBasket || []);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(readCheckoutDoc());
  }, [dispatch]);

  const handleDelete = (itemId) => {
    dispatch(deleteCheckoutDoc(itemId));
    updateQuantity(itemId);
  };

  useEffect(() => {
    if (items && items.length > 0) {
      setCartItems(items.map((item) => ({ ...item, quantity: item.quantity || 1 })));
    }
    
  }, [items]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  let total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Navbar */}
      <div className={`nav-bar ${isNavVisible ? "visible" : "hidden"}`}>
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light mb-8 cont1">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                        </button>
                    </div>
                    <p className="text-gray-600 mt-1">${item.price ? item.price.toFixed(2) : "0.00"}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="text-2xl font-light mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <br />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4 mt-6">
                  <a
                    href="/mpesaPayment"
                    className="text-center flex-1 bg-black hover:bg-gray-800 hover:no-underline text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    MPesa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
            <button variant="outline" className="mt-4">
              Continue Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
}