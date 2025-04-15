import productModel from "../models/products.js";

export const getAllProduct = async () => {
  return await productModel.find();
};

export const seedProduct = async () => {
  try {
    const products = [
      {
        title: "Wireless Headphones",
        image:
          "https://media.wired.com/photos/66abec9ccb172c2e5de763bf/master/w_960,c_limit/Edifier-Stax-Spirit-S5-Headphones-Offwhite-Background-SOURCE-Amazon.jpg",
        price: 59.99,
        stock: 25,
      },
      {
        title: "Smartwatch Pro",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdU_3QMqLQKky8-EKGhpXD7NWeBEGpY6ZiDg&s",
        price: 129.99,
        stock: 18,
      },
      {
        title: "Gaming Mouse",
        image:
          "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg",
        price: 39.95,
        stock: 40,
      },
      {
        title: "Mechanical Keyboard",
        image:
          "https://m.media-amazon.com/images/I/51eaOKCs4FL._AC_UF894,1000_QL80_.jpg",
        price: 74.5,
        stock: 12,
      },
      {
        title: "4K Monitor",
        image:
          "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg",
        price: 289.99,
        stock: 8,
      },
      {
        title: "Bluetooth Speaker",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9cYWSaBNIhOPF2gguIun1olGtIYrHAlOO7w&s",
        price: 45.0,
        stock: 30,
      },
      {
        title: "Portable SSD 1TB",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtIarlaLtqjkLN4u-FyV-ysYdyjMNh-6dWw&s",
        price: 109.0,
        stock: 22,
      },
      {
        title: "Webcam Full HD",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBkuaOQUuMoQIIobO63wmagf096N0HAl67Q&s",
        price: 49.99,
        stock: 16,
      },
      {
        title: "Laptop Stand",
        image:
          "https://m.media-amazon.com/images/I/81MN9l2nl2S._AC_SL1500_.jpg",
        price: 29.99,
        stock: 50,
      },
      {
        title: "Ergonomic Chair",
        image:
          "https://images-cdn.ubuy.co.in/633bc22597235258d52d0584-office-chair-felixking-ergonomic-desk.jpg",
        price: 199.99,
        stock: 5,
      },
    ];

    const isProduct = await getAllProduct();

    if (isProduct.length == 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot seed database ", err);
  }
};
