import { User } from "../model/auth.model.js";
import { Session } from "../model/session.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";
import config from "../config/config.js"; // Aapki config file
import { signAccessToken, signRefreshToken } from "../lib/jwt.js";

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

    // * if user exists
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "Use already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    // * creating new user
    const user = await User.create({
      username,
      email,
      password: hashPass,
    });

    const payload = {
      id: user._id,
    };

    // refreshToken generated
    const refreshToken = signRefreshToken(payload);

    const session = await Session.create({
      refreshToken,
      verify: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // * accessToken generated
    const accessToken = signAccessToken(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
    });
    
    res.status(201).json({
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
  const { email, password } = req.body;

  try {
    if (!email || !password) {
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
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }

    const isRightPassword = await bcrypt.compare(password, existUser.password);

    if (!isRightPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const logout = async (req, res) => {};
