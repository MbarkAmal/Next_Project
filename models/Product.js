import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, default: "Generic" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["beauty", "femme", "homme", "accessories"],
      required: true,
    },

    // 🔥 Main product image (Cloudinary URL)
    image: { type: String, required: true },

    // 🔥 Colors (each color has an image)
    colors: { type: [ColorSchema], default: [] },

    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL", "ONE_SIZE"],
      default: ["M"],
    },

    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true, required: true },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
