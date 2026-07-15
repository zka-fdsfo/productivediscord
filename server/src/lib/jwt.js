import config from "../config/config.js";
import jwt from "jsonwebtoken"

export function signRefreshToken(payload) {
   return jwt.sign(
    payload,
    config.REFRESH_SECRET,
    { expiresIn: config.REFRESH_EXPIRE || "7d" }, // Security ke liye expiry lagana zaroori hai
  );
}

export function verifyRefreshToken(token) {}

export function signAccessToken(payload) {
   return jwt.sign(
    payload,
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRE || "15m" }, // Security ke liye expiry lagana zaroori hai
  );
}

export function verifyAccessToken(token) {}
