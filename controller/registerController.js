import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult, query } from "express-validator";

// FOR USER TO SIGNUP ACCOUNT
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/register
// NO AUTHENTICATION REQUIRED

export const postRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, err: errors.array() });
    }

    const { name, email, password } = req.body;

    const userAlreadyExits = await User.findOne({ email: email });
    if (!userAlreadyExits) {
      const hashpass = bcrypt.hashSync(password, 12);
      const newUser = new User({
        name,
        password: hashpass,
        email,
        role: "NORMAL",
      });
      const saveuser = await newUser.save();

      const token = jwt.sign(
        {
          name: saveuser.name,
          id: saveuser.id,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        success: true,
        user: {
          name: saveuser.name,
          id: saveuser.id,
          email: saveuser.email,
        },
        token: "Bearer " + token,
      });
    } else {
      return res.status(401).json({
        success: false,
        err: "User already exits!",
      });
    }
  } catch (error) {
    console.log("Api error : postRegisterController", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};
