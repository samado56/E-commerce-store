import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
