import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}

export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}
