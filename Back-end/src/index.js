import express from "express";
import mongosse from "mongoose";
import studentRouter from "./routers/students.js";
import userRouter from "./routers/users.js";
import cors from "cors";

const app = express();

const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

mongosse
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("database has been connected"));

// app.post('/students', (req, res) => {

// })

app.use("/students", studentRouter);

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`listenning or port ${port}`);
});
