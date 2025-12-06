import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // <-- fixed here
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
