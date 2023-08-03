import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import {
  createUserState,
  deleteUserState,
  getUserStateById,
  getUserStates,
  updateUserState,
} from "../queries/user_states.js";

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

router.get("/", async (req, res, next) => {
  try {
    await poolConnect;
    const userStates = await getUserStates(pool);
    res.send(200, userStates);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await poolConnect;
    const id = req.params.id;
    const userState = await getUserStateById(pool, id);
    res.send(200, userState);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await poolConnect;
    const state_name = req.body.STATE_NAME;
    const result = await createUserState(pool, state_name);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    await poolConnect;
    const state_id = req.body.STATE_ID;
    const state_name = req.body.STATE_NAME;
    const result = await updateUserState(pool, state_id, state_name);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await poolConnect;
    const state_id = req.params.id;
    const result = await deleteUserState(pool, state_id);
    res.send(200, result);
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
