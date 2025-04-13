import express from "express";

import { getAllProduct } from "../services/productServeice.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const findProduct = await getAllProduct();

  res.status(200).send(findProduct);
});

export default router;
