"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, address }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Success: redirect to signin page
      router.push("/signin");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-[#162660] text-center">
          Create Account
        </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
  {/* Name */}
  <div>
    <label className="block text-gray-700 mb-2">Full Name</label>
    <input
      type="text"
      placeholder="your name ..."
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-gray-700 mb-2">Email</label>
    <input
      type="email"
      placeholder="your@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-gray-700 mb-2">Password</label>
    <input
      type="password"
      placeholder="********"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>

  {/* Address 
  <div>
    <label className="block text-gray-700 mb-2">Address</label>
    <input
      type="text"
      placeholder="Your address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
*/}
  {error && <p className="text-red-500">{error}</p>}

  <button
    type="submit"
    className="w-full bg-[#162660] text-white py-3 rounded-xl font-semibold transition"
    disabled={loading}
  >
    {loading ? "Creating..." : "Sign Up"}
  </button>
</form>


        <p className="text-center text-gray-700 mt-5">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-[#162660] font-medium hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
