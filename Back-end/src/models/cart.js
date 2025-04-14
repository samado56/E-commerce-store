import mongoose from "mongoose";

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: [cartItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  status: { type: String, default: "active" },
});

export const cartModel = mongoose.model("Cart", cartSchema);
