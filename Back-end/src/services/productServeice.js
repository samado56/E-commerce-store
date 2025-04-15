import productModel from "../models/products.js";

export const getAllProduct = async () => {
  return await productModel.find();
};

export const seedProduct = async () => {
  try {
    const products = [
      {
        title: "Wireless Headphones",
        image: "https://example.com/images/headphones.jpg",
        price: 59.99,
        stock: 25,
      },
      {
        title: "Smartwatch Pro",
        image: "https://example.com/images/smartwatch.jpg",
        price: 129.99,
        stock: 18,
      },
      {
        title: "Gaming Mouse",
        image: "https://example.com/images/gaming-mouse.jpg",
        price: 39.95,
        stock: 40,
      },
      {
        title: "Mechanical Keyboard",
        image: "https://example.com/images/keyboard.jpg",
        price: 74.5,
        stock: 12,
      },
      {
        title: "4K Monitor",
        image: "https://example.com/images/monitor.jpg",
        price: 289.99,
        stock: 8,
      },
      {
        title: "Bluetooth Speaker",
        image: "https://example.com/images/speaker.jpg",
        price: 45.0,
        stock: 30,
      },
      {
        title: "Portable SSD 1TB",
        image: "https://example.com/images/ssd.jpg",
        price: 109.0,
        stock: 22,
      },
      {
        title: "Webcam Full HD",
        image: "https://example.com/images/webcam.jpg",
        price: 49.99,
        stock: 16,
      },
      {
        title: "Laptop Stand",
        image: "https://example.com/images/laptop-stand.jpg",
        price: 29.99,
        stock: 50,
      },
      {
        title: "Ergonomic Chair",
        image: "https://example.com/images/chair.jpg",
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
