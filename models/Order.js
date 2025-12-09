import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true }, // snapshot
  image: { type: String, required: true }, // snapshot
  price: { type: Number, required: true }, // snapshot
  selectedColor: { type: String },
  selectedSize: { type: String },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new mongoose.Schema(
  {
    // ⭐ User reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ⭐ Snapshot of user at order time
    userInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String },
    },

    //  Order Items
    items: [OrderItemSchema],

    //  Shipping Information
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },

    //  Payment
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "credit_card", "paypal"],
      default: "cash_on_delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: { type: String },

    // ⭐ Order Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    // ⭐ Totals
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
