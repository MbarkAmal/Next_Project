import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { category } = await params;

    let normalized = (category || "").toLowerCase().trim();
    if (normalized === "accessory") {
      normalized = "accessories";
    }

    // Case-insensitive regex match for category
    const products = await Product.find({
      category: { $regex: new RegExp(`^${normalized}$`, "i") },
    });

    return Response.json(
      { success: true, count: products.length, data: products },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
