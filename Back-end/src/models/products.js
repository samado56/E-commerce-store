import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 10 },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
