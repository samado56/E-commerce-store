import dotenv from "dotenv";
dotenv.config();
// import("dotenv/config.js");

import express from "express";
import mongosse from "mongoose";

import userRouter from "./routers/users.js";
import cors from "cors";
import { seedProduct } from "./services/productServeice.js";
import productRouter from "./routers/products.js";
import cartRouter from "./routers/cart.js";

const app = express();

const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

mongosse
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database has been connected"));

//seed products
seedProduct();

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`listenning or port ${port}`);
});
