import dbConnect from "@/lib/db"; // your MongoDB connection
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { fullName, email, password, role, address } = await req.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
      address
    });

    // Return user data without password
    const userData = { ...newUser.toObject() };
    delete userData.password;

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
