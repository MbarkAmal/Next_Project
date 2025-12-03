// /app/api/products/route.js
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find();
    return Response.json({ success: true, data: products });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.sku) {
      return new Response(JSON.stringify({ success: false, error: "SKU is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const existing = await Product.findOne({ sku: body.sku });
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "SKU already exists" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const product = await Product.create(body);
return Response.json(
  { success: true, data: product },
  { status: 201 }
);
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}


