import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { products } from "../app/data/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load env vars from .env.local if not already defined
function loadEnv() {
  const envLocalPath = path.resolve(__dirname, "../.env.local");
  const envPath = path.resolve(__dirname, "../.env");
  const targetPath = fs.existsSync(envLocalPath)
    ? envLocalPath
    : fs.existsSync(envPath)
    ? envPath
    : null;

  if (targetPath) {
    const content = fs.readFileSync(targetPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/challenge_eco";

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function normalizeCategory(category) {
  if (!category) return "accessories";
  const cat = category.toLowerCase().trim();
  if (cat === "accessory") return "accessories";
  return cat;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    brand: { type: String, default: "Grinato" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["beauty", "femme", "homme", "accessories"],
      required: true,
    },
    type: { type: String, default: "regular" },
    image: { type: String, required: true },
    colors: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    sizes: { type: [String], default: [] },
    stock: { type: Number, default: 25 },
    sku: { type: String, unique: true, required: true },
    rating: {
      rate: { type: Number, default: 4.5 },
      count: { type: Number, default: 12 },
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seed() {
  console.log("Connecting to MongoDB at:", MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log(" Connected to MongoDB successfully.");

  console.log(`Preparing to seed ${products.length} products...`);

  let insertedCount = 0;
  for (const [index, p] of products.entries()) {
    const slug = slugify(p.name);
    const category = normalizeCategory(p.category);
    const sku = `GRN-${String(p.id || index + 1).padStart(4, "0")}`;

    const productPayload = {
      name: p.name,
      slug,
      description: p.description || "High quality product from Grinato.",
      brand: "Grinato",
      price: Number(p.price) || 0,
      category,
      type: (p.type || "regular").toLowerCase().trim(),
      image: p.image,
      colors: Array.isArray(p.colors) ? p.colors : [],
      sizes: Array.isArray(p.sizes) ? p.sizes : [],
      stock: 25,
      sku,
      rating: {
        rate: 4.5,
        count: 14 + index,
      },
    };

    await Product.findOneAndUpdate(
      { slug },
      { $set: productPayload },
      { upsert: true, new: true, runValidators: true }
    );
    insertedCount++;
    console.log(`  [${insertedCount}/${products.length}] Upserted: ${p.name} (${slug}) -> ${category}`);
  }

  console.log(`\n Successfully seeded ${insertedCount} products into database.`);
  await mongoose.disconnect();
  console.log("Database connection closed.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(" Seed failed with error:", err);
  process.exit(1);
});
