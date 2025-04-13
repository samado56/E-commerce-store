import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
  fullName: String,
  email: String,
  age: String,
  class: String,
});

export const studentModel = mongoose.model("students", studentSchema);
