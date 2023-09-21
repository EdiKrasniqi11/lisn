import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "../queries/users.js";
import {
  authenticateAdminToken,
  authenticateUserToken,
} from "../middleware/tokenAuthentication.js";

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

router.get("/", authenticateAdminToken, async (req, res, next) => {
  try {
    await poolConnect;
    const users = await getUsers(pool);
    res.send(200, users);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.get("/my-user", authenticateUserToken, async (req, res, next) => {
  try {
    await poolConnect;
    const users = await getUsers(pool);
    const user = users.find(
      (user) => user.USERNAME == req.user.name || user.EMAIL == req.user.name
    );
    res.send(200, user);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await registerUser(pool, req.body);
    res.send(201, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    await poolConnect;
    const result = await updateUser(pool, req.body);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.delete("/:id", authenticateUserToken, async (req, res, next) => {
  try {
    await poolConnect;
    const existingUser = await getUserById(pool, req.params.id);
    if (
      req.user.role === 1 ||
      req.user.name == existingUser.USERNAME ||
      req.user.name == existingUser.EMAIL
    ) {
      const result = await deleteUser(pool, req.params.id);
      res.send(200, result);
    }
  } catch (error) {
    res.send(error);
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
