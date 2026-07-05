import { User } from "../model/auth.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";
import config from "../config/config.js"; // Aapki config file


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // * check all field
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all Field is required",
      });
    }

    // * check user exist or not
    const existUser = await User.findOne({
      email,
    });

    // * if user not exists
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "Use already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    // * ceating new user
    const user = await User.create({
      username,
      email,
      password: hashPass,
    });

    const payload = {
      id: user._id,
    };

    // * token generated
    const token = jwt.sign(
      payload,
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRE || "1d" }, // Security ke liye expiry lagana zaroori hai
    );

  
    
    res.status(201).cookie("token", token).json({
      success: true,
      message: "User register successfully",
      payload,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const login = async (req, res) => {
    
};



export const logout = async (req, res) => {};
