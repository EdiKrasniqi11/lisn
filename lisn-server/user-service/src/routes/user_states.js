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

router.get("/", async (req, res, next) => {
  try {
    const userStates = await getUserStates(sql, config);
    res.send(200, userStates);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userState = await getUserStateById(sql, config, id);
    res.send(200, userState);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const state_name = req.body.STATE_NAME;
    const result = await createUserState(sql, config, state_name);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.put("/", async (req, res, next) => {
  try {
    const state_id = req.body.STATE_ID;
    const state_name = req.body.STATE_NAME;
    const result = await updateUserState(sql, config, state_id, state_name);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const state_id = req.params.id;
    const result = await deleteUserState(sql, config, state_id);
    res.send(200, result);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

export default router;
