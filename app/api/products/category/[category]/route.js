import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { category } = await params;

    // Find products matching the category
    const products = await Product.find({ category });

    return new Response(
      JSON.stringify({ success: true, data: products }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
