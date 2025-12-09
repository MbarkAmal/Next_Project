import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { userId } = await params; // get userId from URL
    const body = await req.json();
    const { items, shippingAddress, paymentMethod } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in the order" },
        { status: 400 }
      );
    }

    // Get user snapshot
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Process items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      });
    }

    const shippingCost = 10; // can be dynamic
    const total = subtotal + shippingCost;

    // Create the order
    const newOrder = await Order.create({
      user: user._id,
      userInfo: {
        fullName: user.fullName,
        email: user.email,
        address: user.address,
      },
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "cash_on_delivery",
      subtotal,
      shippingCost,
      total,
    });

    return NextResponse.json({
      success: true,
      message: "Order created",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
