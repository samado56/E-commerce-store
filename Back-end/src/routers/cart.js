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
  checkout,
} from "../services/cartService.js";

const router = express.Router();

router.get("/", validateJWt, async (req, res) => {
  try {
    const userId = req.user._id;
    //get active cart for user
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("somthing went wrong !");
  }
});

router.post("/items", validateJWt, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const cart = await addItemToCart({ userId, productId, quantity });
    res.status(200).send(cart.data);
  } catch (err) {
    res.status(500).send("something went wrong!");
  }
});

router.put("/items", validateJWt, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const updatCart = await updateItems({ userId, productId, quantity });
    res.status(updatCart.statusCode).send(updatCart.data);
  } catch (err) {
    res.status(500).send("something went wrong!");
  }
});

router.delete("/items/:id", validateJWt, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const deleteItem = await deleteItemFromCart({ userId, id });
    res.status(deleteItem.statusCode).send(deleteItem.data);
  } catch (err) {
    res.status(500).send("somthing went wrong!");
  }
});

//clear cart

router.delete("/", validateJWt, async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("somthing went wrong!");
  }
});

router.post("/checkout", validateJWt, async (req, res) => {
  try {
    const userId = req.user._id;
    const { adress } = req.body;
    const response = await checkout({ userId, adress });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).sned("somthing went wrong!");
  }
});

export default router;
