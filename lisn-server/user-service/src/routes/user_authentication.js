import {
  getRefreshTokens,
  login,
  logout,
  refreshToken,
} from "../queries/user_authentication.js";
import express from "express";
import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

const router = express.Router();
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

router.post("/login", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await login(pool, req.body);
    res.send(result.status, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await logout(pool, req.body.REFRESH_TOKEN);
    res.send(result.status, result.message);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.get("/token", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await getRefreshTokens(pool);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await refreshToken(req.body.REFRESH_TOKEN, pool);
    res.send(result.status, result);
  } catch (error) {
    res.send(400, error);
    next(error);
  }
});

process.on("beforeExit", async () => {
  try {
    await pool.close();
  } catch (err) {
    console.error("Error closing the SQL pool:", err);
  }
});
export default router;
