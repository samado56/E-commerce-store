import express from "express";

import { register, login } from "../services/userServices.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(statusCode).json(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { statusCode, data } = await login({
    email,
    password,
  });

  res.status(statusCode).json(data);
});

export default router;
