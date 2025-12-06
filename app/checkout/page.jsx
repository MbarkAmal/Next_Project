"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePlaceOrder = () => {
    // For now, simulate order placement
    setOrderPlaced(true);
    setStep(3);
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex justify-between mb-8 flex-col sm:flex-row">
        {["User Info", "Cart Review", "Confirmation"].map((label, index) => (
          <div key={index} className="flex-1 flex items-center mb-4 sm:mb-0">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                step > index ? "bg-green-600 text-white" : "border border-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-3 text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: User Info */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={userInfo.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userInfo.address}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:col-span-2"
            />
          </div>
          <button
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Cart Review */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart Review</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 flex-col sm:flex-row"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <span>{item.name}</span>
                </div>
                <span className="mt-2 sm:mt-0">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && orderPlaced && (
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
          <p className="mb-6 text-gray-700">Your order has been placed successfully.</p>
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
