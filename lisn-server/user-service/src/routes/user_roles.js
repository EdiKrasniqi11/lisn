import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import {
  getUserRoles,
  getUserRoleById,
  createUserRole,
  deleteUserRole,
  updateUserRole,
} from "../queries/user_roles.js";

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
    const userRoles = await getUserRoles(sql, config);
    res.send(200, userRoles);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userRole = await getUserRoleById(sql, config, req.params.id);
    if (userRole === null || userRole === {}) {
      res.send(404, "User role with id " + req.params.id + " does not exist.");
    } else {
      res.send(200, userRole);
    }
  } catch (error) {
    res.send(400, error);
    next(error);
  } finally {
    sql.close();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await createUserRole(sql, config, req.body.ROLE_NAME);
    res.send(200, result);
  } catch (error) {
    res.send(400, error);
    next(error);
  } finally {
    sql.close();
  }
});

router.put("/", async (req, res, next) => {
  try {
    const result = await updateUserRole(
      sql,
      config,
      req.body.ROLE_ID,
      req.body.ROLE_NAME
    );
    res.send(200, result);
  } catch {
    next(error);
  } finally {
    sql.close();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteUserRole(sql, config, req.params.id);
    if (result === null || result === {}) {
      res.send(404, "ROLE with id:" + req.params.id + " DOES NOT EXIST.");
    }
    res.send(200, result);
  } catch (error) {
    next(error);
  } finally {
    sql.close();
  }
});

export default router;
