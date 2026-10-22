import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { success: false, error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    return Response.json({ success: true, cart }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, productId, color, size, quantity = 1 } = body;

    if (!userId || !productId) {
      return Response.json(
        { success: false, error: "userId and productId are required" },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return Response.json(
        { success: false, error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            product: productId,
            color,
            size,
            quantity,
          },
        ],
      });

      return Response.json({ success: true, cart }, { status: 201 });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color?.name === color?.name
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        size,
        color,
        quantity,
      });
    }

    await cart.save();

    return Response.json({ success: true, cart }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, itemId, quantity } = body;

    if (!userId || !itemId || quantity === undefined) {
      return Response.json(
        { success: false, error: "userId, itemId and quantity are required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Response.json(
        { success: false, error: "Cart not found" },
        { status: 404 }
      );
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return Response.json(
        { success: false, error: "Item not found in cart" },
        { status: 404 }
      );
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    return Response.json({ success: true, cart }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");

    if (!userId) {
      return Response.json(
        { success: false, error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Response.json(
        { success: false, error: "Cart not found" },
        { status: 404 }
      );
    }

    if (itemId) {
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== itemId
      );
    } else {
      cart.items = [];
    }

    await cart.save();

    return Response.json({ success: true, cart }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
