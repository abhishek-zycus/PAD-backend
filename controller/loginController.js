import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const postLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, err: errors.array() });
    }

    const { email, password } = req.body;
    const userAlreadyExits = await User.findOne({ email });
    if (!userAlreadyExits) {
      return res
        .status(401)
        .json({ success: false, err: "Invalid credential!" });
    } else {
      const matchPassword = await bcrypt.compare(
        password,
        userAlreadyExits.password
      );
      if (!matchPassword) {
        return res
          .status(401)
          .json({ success: false, err: "Invalid credential!" });
      } else {
        const token = jwt.sign(
          {
            name: userAlreadyExits.name,
            id: userAlreadyExits.id,
            role: userAlreadyExits.role,
          },
          process.env.JWT_SECRET
        );
        // console.log(token);
        return res.status(200).json({
          success: true,
          user: {
            name: userAlreadyExits.name,
            id: userAlreadyExits.id,
            email: userAlreadyExits.email,
          },
          token: "Bearer " + token,
        });
      }
    }
  } catch (error) {
    console.log("Api error : postLoginController : ", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};
