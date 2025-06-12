import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function MpesaPayment() {
  const [mpesaCode, setMpesaCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">M-Pesa Payment</h2>
          <p className="text-gray-600 mt-2">Complete your payment with M-Pesa</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-medium text-gray-700 mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Paybill Number:</span>
                <span className="font-mono font-medium text-gray-800">247247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Number:</span>
                <span className="font-mono font-medium text-gray-800">CIRALUXE</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter M-Pesa Code
              </label>
              <input
                type="text"
                value={mpesaCode}
                onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                placeholder="e.g. QWE1234XYZ"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength="10"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 
                       transition-colors duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                'Verify Payment'
              )}
            </button>
          </form>
        </div>

        <div className="text-center space-y-3 mb-16"> {/* Added mb-16 for bottom margin */}
  <p className="text-sm text-gray-600 flex items-center justify-center">
    <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
    Your payment is secure and encrypted
  </p>
  <div className="text-xs text-gray-500 space-y-1">
    <p>1. Go to M-PESA on your phone</p>
    <p>2. Select Pay Bill option</p>
    <p>3. Enter Business no. 247247</p>
    <p>4. Enter Account no. CIRALUXE</p>
    <p>5. Enter the Amount</p>
    <p>6. Enter your M-PESA PIN</p>
    <p>7. Enter the M-PESA code received here</p>
  </div>
</div>

<div className="absolute bottom-6 right-6 flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
  <span className="text-sm text-gray-700 mr-3">Contact us for delivery details</span>
  <a 
    href="https://wa.me/254706552803" 
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-200 hover:scale-105"
  >
    <FaWhatsapp className="text-xl" />
  </a>
</div>
      </div>
    </div>
  );
}