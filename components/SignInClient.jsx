"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#162660]">
          Sign In
        </h1>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#162660] text-white py-3 rounded-xl font-semibold transition hover:bg-[#0f1b46] cursor-pointer disabled:bg-gray-400"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

        <div className="flex justify-center gap-6 text-gray-500 mt-5 text-sm">
          <Link href="/signup" className="text-[#162660] font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
