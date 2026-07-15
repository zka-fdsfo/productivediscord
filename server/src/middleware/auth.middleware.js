import { verifyAccessToken } from "../lib/jwt.js";

export const verifyJwt = async function (req, res, next) {
  try {
    console.log(req.cookies);
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user.",
      });
    }
    const payload = verifyAccessToken(token);
    req.user = { id: payload._id };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
