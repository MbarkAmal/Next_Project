import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return Response.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
