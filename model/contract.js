import mongoose, { Schema, model } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const ContractScheme = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    companyName: String,
    companyEmail: String,
    date: Date,
    expectedPayment: Number,
    duePayment: Number,
    status: String,
  },
  { timestamps: true }
);
ContractScheme.plugin(AutoIncrement, { inc_field: "contractID" });
const Contract = model("Contract", ContractScheme);
export default Contract;
