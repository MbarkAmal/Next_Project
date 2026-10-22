import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { slugify } from "@/lib/slug";

// --------------------
// GET /api/products
// Supports ?category=homme & ?type=trendy
// --------------------
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    let query = {};
    if (category) {
      let normalized = category.toLowerCase().trim();
      if (normalized === "accessory") normalized = "accessories";
      query.category = { $regex: new RegExp(`^${normalized}$`, "i") };
    }
    if (type) {
      query.type = { $regex: new RegExp(`^${type.toLowerCase().trim()}$`, "i") };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return Response.json(
      {
        success: true,
        count: products.length,
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// --------------------
// POST /api/products
// --------------------
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name) {
      return Response.json(
        { success: false, error: "Product name is required" },
        { status: 400 }
      );
    }

    if (!body.sku) {
      return Response.json(
        { success: false, error: "SKU is required" },
        { status: 400 }
      );
    }

    // Check for duplicate SKU
    const existingSku = await Product.findOne({ sku: body.sku });
    if (existingSku) {
      return Response.json(
        { success: false, error: "SKU already exists" },
        { status: 400 }
      );
    }

    // Check or generate slug
    let slug = body.slug ? slugify(body.slug) : slugify(body.name);
    let existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const product = await Product.create({
      ...body,
      slug,
      image: body.image,
    });

    return Response.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
