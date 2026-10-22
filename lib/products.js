import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export function serializeProduct(doc) {
  if (!doc) return null;
  const p = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
  return {
    ...p,
    _id: p._id?.toString?.() || String(p._id),
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
    colors: Array.isArray(p.colors)
      ? p.colors.map((c) => ({
          ...c,
          _id: c._id?.toString?.() || undefined,
          name: c.name,
          image: c.image,
        }))
      : [],
    sizes: Array.isArray(p.sizes) ? p.sizes : [],
  };
}

export async function getProducts({ category, type, search, sort = "newest", limit = 50 } = {}) {
  await dbConnect();

  let query = {};
  if (category && category.toLowerCase() !== "all") {
    let normalized = category.toLowerCase().trim();
    if (normalized === "accessory") normalized = "accessories";
    query.category = { $regex: new RegExp(`^${normalized}$`, "i") };
  }

  if (type) {
    query.type = { $regex: new RegExp(`^${type.toLowerCase().trim()}$`, "i") };
  }

  if (search && search.trim()) {
    const s = search.trim();
    query.$or = [
      { name: { $regex: s, $options: "i" } },
      { description: { $regex: s, $options: "i" } },
      { category: { $regex: s, $options: "i" } },
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price-low") sortOption = { price: 1 };
  else if (sort === "price-high") sortOption = { price: -1 };
  else if (sort === "rating") sortOption = { "rating.rate": -1 };

  const raw = await Product.find(query)
    .sort(sortOption)
    .limit(limit)
    .lean();

  return raw.map(serializeProduct);
}

export async function getProductByIdOrSlug(identifier) {
  if (!identifier) return null;
  await dbConnect();

  let product = null;
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    product = await Product.findById(identifier).lean();
  }

  if (!product) {
    product = await Product.findOne({
      slug: identifier.toLowerCase().trim(),
    }).lean();
  }

  return product ? serializeProduct(product) : null;
}

export async function getAllProductSlugs() {
  await dbConnect();
  const products = await Product.find({}, "slug updatedAt").lean();
  return products.map((p) => ({
    slug: p.slug,
    updatedAt: p.updatedAt || new Date(),
  }));
}
