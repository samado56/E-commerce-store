import { cartModel } from "../models/cart.js";
import orderModel from "../models/order.js";
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

// export const checkout = async ({ userId, adress }) => {
//   if (!adress) {
//     return { data: "please provide the adress!", statusCode: 400 };
//   }
//   const cart = await getActiveCartForUser({ userId });

//   const orderItems = [];

//   //loop cartItems and create orderItems
//   for (const item of cart.item) {
//     const product = await productModel.findById(item.product);

//     if (!product) {
//       return { data: "product not found !", statusCode: 400 };
//     }

//     const orderItem = {
//       productTitle: product.title,
//       productImage: product.image,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//     };

//     orderItems.push(orderItem);
//   }

//   const order = await orderModel.create({
//     orderItems,
//     total: cart.totalAmount,
//     adress,
//     userId,
//   });

//   await order.save();

//   //update cart status

//   cart.status = "completed";

//   await cart.save();

//   return { data: order, statusCode: 201 };
// };

export const checkout = async ({ userId, adress }) => {
  if (!adress) {
    return { data: "please provide the address!", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });
  console.log("Cart fetched for checkout:", cart);

  const orderDetails = [];

  for (const item of cart.item) {
    const product = await productModel.findById(item.product);
    if (!product) {
      console.log("Product not found:", item.product);
      continue;
    }

    const orderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };

    console.log("Adding orderItem:", orderItem);
    orderDetails.push(orderItem);
  }
  // console.log("order =======:", orderItems);

  if (orderDetails.length === 0) {
    return { data: "No valid items in cart!", statusCode: 400 };
  }

  const order = await orderModel.create({
    orderItmes: orderDetails,
    total: cart.totalAmount,
    adress,
    userId,
  });

  cart.status = "completed";
  await cart.save();

  console.log("############ checkout ############", order);

  return { data: order, statusCode: 201 };
};
