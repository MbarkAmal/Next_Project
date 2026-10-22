"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { trackPurchase } from "@/lib/analytics";

export default function CheckoutClient() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const totalPrice = Number((subtotal + tax).toFixed(2));

  // Pre-fill user info from localStorage on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user) {
          setUserInfo((prev) => ({
            ...prev,
            fullName: user.fullName || "",
            email: user.email || "",
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePlaceOrder = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user || !user._id) {
        alert("You must be logged in to place an order.");
        return;
      }

      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          selectedColor: item.selectedColor || null,
          selectedSize: item.selectedSize || null,
          price: item.price,
        })),
        shippingAddress: {
          address: userInfo.address,
          phone: userInfo.phone,
          city: "Tunis",
        },
        paymentMethod: paymentMethod || "cash_on_delivery",
        total: totalPrice,
      };

      const res = await fetch(`/api/orders/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Track GA4 purchase event
        trackPurchase({
          transactionId: result.order?._id || `ORD-${Date.now()}`,
          value: totalPrice,
          tax,
          items: cart,
        });

        if (typeof clearCart === "function") {
          clearCart();
        }

        setOrderPlaced(true);
        setStep(3);
      } else {
        alert("Order failed: " + (result.error || result.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-[#162660]">
        Checkout
      </h1>

      {/* Step Indicator */}
      <div className="flex justify-between mb-8 flex-col sm:flex-row gap-4">
        {["User Info", "Cart Review", "Confirmation"].map((label, index) => (
          <div key={index} className="flex-1 flex items-center mb-4 sm:mb-0">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                step > index
                  ? "bg-green-600 text-white"
                  : step === index + 1
                  ? "bg-[#162660] text-white"
                  : "border border-gray-300 text-gray-500"
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
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={userInfo.fullName}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-[#162660] w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-[#162660] w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={userInfo.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-[#162660] w-full"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Address"
                value={userInfo.address}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-[#162660] w-full"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-[#162660] text-white font-semibold rounded-lg hover:bg-[#0f1b46] transition cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Cart Review */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Cart Review</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3 flex-col sm:flex-row gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image || "/pub.jpg"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800 block">{item.name}</span>
                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="mt-2 sm:mt-0 font-semibold text-[#162660]">
                  {(item.price * item.quantity).toFixed(2)} dt
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold mb-6 text-gray-900 border-t pt-4">
            <span>Total (including 10% delivery):</span>
            <span>{totalPrice.toFixed(2)} dt</span>
          </div>

          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block font-semibold mb-2 text-gray-800">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#162660]"
            >
              <option value="credit_card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="px-6 py-3 bg-[#162660] text-white font-semibold rounded-lg hover:bg-[#0f1b46] transition cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && orderPlaced && (
        <div className="bg-white p-12 rounded-xl shadow-md text-center border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-[#162660]">
            Thank you for your order!
          </h2>
          <p className="mb-6 text-gray-700">
            Your order has been placed successfully and is being processed.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#162660] text-white font-semibold rounded-lg hover:bg-[#0f1b46] transition"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
