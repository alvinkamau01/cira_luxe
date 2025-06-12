"use client"

import { useState } from "react"
import { CreditCard, Calendar, Lock, User } from "lucide-react"
import NavBar from "./navBar"


export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      alert("Payment processed successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen  bg-rose-50 flex items-center justify-center p-4">
      <NavBar/>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-8 transition-all duration-500 ease-in-out transform hover:scale-105">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Complete Your Payment</h2>
          <p className="mt-2 text-sm text-gray-600">Secure and easy payment</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="card-number" className="sr-only">
                Card Number
              </label>
              <div className="relative">
                <input
                  id="card-number"
                  name="card-number"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="Card Number"
                />
                <CreditCard className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label htmlFor="expiry" className="sr-only">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="MM / YY"
                  />
                  <Calendar className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="w-1/2 px-2">
                <label htmlFor="cvv" className="sr-only">
                  CVV
                </label>
                <div className="relative">
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="CVV"
                  />
                  <Lock className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name on Card
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="Name on Card"
                />
                <User className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Save card for future purchases
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Your payment is secure and encrypted</p>
        </div>
      </div>
    </div>
  )
}
