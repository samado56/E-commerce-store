import { cartModel } from "../models/cart.js";
import productModel from "../models/products.js";

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

export const addItemToCart = async ({ userId, productId, quantity }) => {
  const cart = await getActiveCartForUser({ userId });

  //does the item exist in cart?
  const existsInCart = cart.item.find(
    (p) => p.product.toString() === productId
  );

  const product = await productModel.findById(productId);

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  cart.item.push({ product: productId, unitPrice: product.price, quantity });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 201 };
};

export const updateItems = async ({ userId, productId, quantity }) => {
  const cart = await getActiveCartForUser({ userId });

  //does the item exist in cart?
  const existsInCart = cart.item.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item does not  exists in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  const totalitems = cart.item.filter(
    (p) => p.product.toString() !== productId
  );

  //calcult total item utility
  let total = calculatTotalItems({ cart, productId });

  existsInCart.quantity = quantity;

  // total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 201 };
};

export const deleteItemFromCart = async ({ userId, id }) => {
  const cart = await getActiveCartForUser({ userId });

  console.log(cart);

  //does the item exist in cart?
  const existsInCart = cart.item.find((p) => p.product.toString() === id);

  console.log(existsInCart);
  if (!existsInCart) {
    return { data: "Item does not  exists in cart!", statusCode: 400 };
  }

  const newCart = cart.item.filter((p) => p.product.toString() !== id);

  //calcult total item utility
  const total = calculatTotalItems({ cart, id });

  cart.totalAmount = total;

  cart.item = newCart;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 201 };
};

const calculatTotalItems = ({ cart }) => {
  let total = cart.item.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

//clear cart

export const clearCart = async ({ userId }) => {
  const cart = await getActiveCartForUser({ userId });
  cart.item = [];
  cart.totalAmount = 0;

  const clearedCart = await cart.save();
  return { data: clearedCart, statusCode: 200 };
};
