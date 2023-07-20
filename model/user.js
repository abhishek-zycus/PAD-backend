import mongoose, { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const UserScheme = new Schema(
  {
    name: String,
    password: String,
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
    },
    email: String,
  },
  { timestamps: true }
);
UserScheme.plugin(AutoIncrement, { inc_field: "userId" });
const User = mongoose.model("User", UserScheme);

export default User;
