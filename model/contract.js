import mongoose, { Schema, model } from "mongoose";

const ContractScheme = new Schema({
  id: mongoose.ObjectId,
  companyName: String,
  date: Date,
  duePayment: Number,
  expectedPayment: Number,
  status: String,
});

const Contract = model("Contract", ContractScheme);
export default Contract;
