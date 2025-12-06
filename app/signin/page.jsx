"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
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

      // Optionally: store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to home page
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#162660]">
          Sign In
        </h2>

        <form  onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#162660] text-white py-3 rounded-xl font-semibold   transition"
          >
            Sign In
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex justify-center gap-6 text-gray-500 mt-5 text-sm">
          <a href="/signup" className="text-[#162660] font-medium hover:underline">
            Sign Up
          </a>
          <a href="/forgot-password" className="text-[#162660] font-medium hover:underline">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}
