import express from "express";
import sql from "mssql";
import {
  getUserRoles,
  getUserRoleById,
  createUserRole,
  deleteUserRole,
} from "../queries/user_roles.js";

const config = {
  user: "sa",
  password: "Ediedi1507",
  server: "localhost",
  database: "LISN_USERS",
  options: {
    trustServerCertificate: true,
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
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await createUserRole(sql, config, req.body.ROLE_NAME);
    res.send(200, result);
  } catch (error) {
    res.send(400, error);
    next(error);
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
  }
});

export default router;
