import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// --------------------
// GET /api/products
// Supports ?category=Homme
// --------------------
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category) query.category = category;

    const products = await Product.find(query);

    return Response.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

// --------------------
// POST /api/products
// --------------------
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.sku) {
      return new Response(
        JSON.stringify({ success: false, error: "SKU is required" }),
        { status: 400 }
      );
    }

    // Check for duplicate SKU
    const existing = await Product.findOne({ sku: body.sku });
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: "SKU already exists" }),
        { status: 400 }
      );
    }

    const product = await Product.create({
      ...body,
      image: body.image, // Cloudinary URL
    });

    return new Response(
      JSON.stringify({ success: true, data: product }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
