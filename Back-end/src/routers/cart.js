import express from "express";
import validateJWt from "../midelllwares/validateJWT.js";
import {
  addItemToCart,
  getActiveCartForUser,
} from "../services/cartService.js";

const router = express.Router();

router.get("/", validateJWt, async (req, res) => {
  const userId = req.user._id;
  //get active cart for user
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.post("/items", validateJWt, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
  const cart = await addItemToCart({ userId, productId, quantity });

  res.status(200).send(cart.data);
});
export default router;
