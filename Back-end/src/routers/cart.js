import express from "express";
import validateJWt from "../midelllwares/validateJWT.js";
import {
  addItemToCart,
  getActiveCartForUser,
} from "../services/cartService.js";
import {
  updateItems,
  deleteItemFromCart,
  clearCart,
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

router.put("/items", validateJWt, async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const updatCart = await updateItems({ userId, productId, quantity });
  res.status(updatCart.statusCode).send(updatCart.data);
});

router.delete("/items/:id", validateJWt, async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  console.log(id);
  const deleteItem = await deleteItemFromCart({ userId, id });

  res.status(deleteItem.statusCode).send(deleteItem.data);
});

//clear cart

router.delete("/", validateJWt, async (req, res) => {
  const userId = req.user._id;
  const response = await clearCart({ userId });

  res.status(response.statusCode).send(response.data);
});

export default router;
