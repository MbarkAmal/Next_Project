import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ success: false, error: "userId missing" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    return Response.json({ success: true, cart });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, productId, color, size, quantity = 1 } = body;

    if (!userId || !productId) {
      return Response.json({ success: false, error: "Missing fields" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json({ success: false, error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    // Create cart if not exists
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

      return Response.json({ success: true, cart });
    }

    // Check if same product + color + size exists
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color?.name === color?.name
    );

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        color,
        quantity,
      });
    }

    await cart.save();

    return Response.json({ success: true, cart });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, itemId, quantity } = body;

    if (!userId || !itemId) {
      return Response.json({ success: false, error: "Missing fields" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Response.json({ success: false, error: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return Response.json({ success: false, error: "Item not found" });
    }

    if (quantity <= 0) {
      // Remove item if quantity = 0
      cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    return Response.json({ success: true, cart });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");

    if (!userId) {
      return Response.json({ success: false, error: "userId missing" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Response.json({ success: false, error: "Cart not found" });
    }

    if (itemId) {
      // Remove single item
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== itemId
      );
    } else {
      // Clear entire cart
      cart.items = [];
    }

    await cart.save();

    return Response.json({ success: true, cart });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
