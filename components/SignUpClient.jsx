"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpClient() {
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

      router.push("/signin");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-[#162660] text-center">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signup-name" className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162660]"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162660]"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162660]"
              required
            />
          </div>

          <div>
            <label htmlFor="signup-address" className="block text-gray-700 text-sm font-medium mb-1">
              Address
            </label>
            <input
              id="signup-address"
              type="text"
              placeholder="Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162660]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#162660] hover:bg-[#0f1b46] text-white py-3 rounded-xl font-semibold transition cursor-pointer disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#162660] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
