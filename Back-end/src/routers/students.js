import express from "express";
import { studentModel } from "../models/student.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const student = await studentModel.find();
  res.status(200).send(student);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const newStudent = await studentModel.create(data);

  newStudent.save();
  res.status(201).send(newStudent);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const updateStudent = await studentModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updateStudent) {
    return res.status(404).send("student not found");
  }

  res.send(updateStudent);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const updateStudent = await studentModel.findByIdAndDelete(id, {
    new: true,
  });

  if (!updateStudent) {
    return res.status(404).send("student not found");
  }

  res.send("student has been deleted succefully");
});

export default router;
