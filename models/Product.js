import mongoose from "mongoose";
import { slugify } from "@/lib/slug";

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, required: true },
    brand: { type: String, default: "Grinato" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["beauty", "femme", "homme", "accessories"],
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      default: "regular",
      lowercase: true,
      trim: true,
      index: true,
    },

    // Main product image (Cloudinary or local static path)
    image: { type: String, required: true },

    // Colors (each color has an image)
    colors: { type: [ColorSchema], default: [] },

    sizes: {
      type: [String],
      default: [],
    },

    stock: { type: Number, default: 20 },
    sku: { type: String, unique: true, required: true, trim: true },
    rating: {
      rate: { type: Number, default: 4.5 },
      count: { type: Number, default: 10 },
    },
  },
  { timestamps: true }
);

ProductSchema.pre("validate", function () {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name);
  }
  if (this.category) {
    const cat = this.category.toLowerCase().trim();
    if (cat === "accessory") {
      this.category = "accessories";
    } else {
      this.category = cat;
    }
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
