import { cartModel } from "../models/cart.js";

const creatCartForUSer = async ({ userId }) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();

  return cart;
};

export const getActiveCartForUser = async ({ userId }) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await creatCartForUSer({ userId });
  }

  return cart;
};

export const addItemToCart = async () => {
  const cart = getActiveCartForUser({ userId });

  //does the item exist in cart?
};
