import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema(
  {
    name: String,
    password: String,
    role: String,
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);

export default User;
