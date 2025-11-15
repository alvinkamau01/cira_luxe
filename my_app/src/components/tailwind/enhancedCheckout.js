"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutDoc, readCheckoutDoc, deleteCheckoutDoc } from "../../redux/asyncActions";
import { Minus, Plus, X, Check, CreditCard, Truck, MapPin } from "lucide-react";
import NavBar from "./navBar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { initiateSTKPush, formatPhoneNumber } from "../../services/mpesaService";

const steps = [
  { id: 1, name: "Cart Review", icon: CreditCard },
  { id: 2, name: "Shipping", icon: Truck },
  { id: 3, name: "Payment", icon: MapPin },
];

export default function EnhancedCheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Kenya",
  });
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'processing', 'success', 'failed'
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [errors, setErrors] = useState({});

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
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item))
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
  const shipping = subtotal > 50 ? 0 : 10.0; // Free shipping over $50
  const tax = subtotal * 0.08;
  let total = subtotal + shipping + tax;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 2) {
      if (!shippingInfo.firstName.trim()) newErrors.firstName = "First name is required";
      if (!shippingInfo.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
      if (!shippingInfo.phone.trim()) newErrors.phone = "Phone number is required";
      if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
      if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleMpesaPayment = async () => {
    if (!shippingInfo.phone.trim()) {
      alert("Please enter your phone number for M-Pesa payment");
      return;
    }

    setPaymentStatus('processing');

    try {
      const formattedPhone = formatPhoneNumber(shippingInfo.phone);
      const result = await initiateSTKPush(
        formattedPhone,
        Math.round(total * 100), // Convert to cents
        `ORDER-${Date.now()}`,
        `Payment for order from ${shippingInfo.firstName} ${shippingInfo.lastName}`
      );

      if (result.success) {
        setCheckoutRequestId(result.checkoutRequestId);
        // In a real app, you'd poll for status or wait for callback
        setTimeout(() => {
          setPaymentStatus('success');
        }, 3000); // Simulate success after 3 seconds
      } else {
        setPaymentStatus('failed');
        alert(`Payment failed: ${result.error}`);
      }
    } catch (error) {
      setPaymentStatus('failed');
      alert(`Payment error: ${error.message}`);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              isCompleted ? 'bg-green-500 border-green-500 text-white' :
              isActive ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderCartReview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review Your Cart</h2>
      {cartItems.map((item) => (
        <Card key={item.id} className="p-4 bg-white">
          <div className="flex gap-4">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{item.name}</h3>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-600">${item.price ? item.price.toFixed(2) : "0.00"}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Input
            value={shippingInfo.firstName}
            onChange={(e) => handleShippingChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Input
            value={shippingInfo.lastName}
            onChange={(e) => handleShippingChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={shippingInfo.email}
            onChange={(e) => handleShippingChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            value={shippingInfo.phone}
            onChange={(e) => handleShippingChange('phone', e.target.value)}
            placeholder="0712345678"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input
            value={shippingInfo.address}
            onChange={(e) => handleShippingChange('address', e.target.value)}
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input
            value={shippingInfo.city}
            onChange={(e) => handleShippingChange('city', e.target.value)}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <Input value="Kenya" disabled />
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Payment</h2>

      {/* Order Summary */}
      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* M-Pesa Payment */}
      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-4">M-Pesa Payment</h3>
        <p className="text-sm text-gray-600 mb-4">
          You'll receive an STK push on your phone. Enter your M-Pesa PIN to complete the payment.
        </p>

        {paymentStatus === null && (
          <Button
            onClick={handleMpesaPayment}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            Pay with M-Pesa
          </Button>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p>Processing payment...</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center py-4">
            <Check className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 font-semibold">Payment successful!</p>
            <p className="text-sm text-gray-600">Your order has been placed.</p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center py-4">
            <X className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <p className="text-red-600 font-semibold">Payment failed</p>
            <p className="text-sm text-gray-600">Please try again or contact support.</p>
            <Button
              onClick={() => setPaymentStatus(null)}
              variant="outline"
              className="mt-4 bg-white"
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Navbar */}
      <div className={`nav-bar ${isNavVisible ? "visible" : "hidden"}`}>
        <NavBar />
      </div>

      <main className="container mx-auto px-4 py-8 pt-24">
        {renderStepIndicator()}

        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && renderCartReview()}
          {currentStep === 2 && renderShippingForm()}
          {currentStep === 3 && renderPayment()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button onClick={handlePrev} className="bg-red-500 hover:bg-red-600 text-white">
                Previous
              </Button>
            )}
            {currentStep < steps.length && paymentStatus !== 'success' && (
              <Button onClick={handleNext} className="ml-auto bg-blue-500 hover:bg-blue-600 text-white">
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}