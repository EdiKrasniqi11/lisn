import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import {
  getCities,
  getCityById,
  createCity,
  deleteCity,
  updateCity,
} from "../queries/cities.js";

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
    const cities = await getCities(pool);
    res.send(200, cities);
  } catch (error) {
    res.send(error);
    next(error);
  } finally {
    sql.close();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await poolConnect;
    const city = await getCityById(pool, req.params.id);
    if (city === null || city === {}) {
      res.send(404, "City with id " + req.params.id + " does not exist.");
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
    await poolConnect;
    const result = await createCity(
      pool,
      req.body.CITY_NAME,
      req.body.COUNTRY_ID
    );
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
    await poolConnect;
    const result = await updateCity(
      pool,
      req.body.CITY_ID,
      req.body.CITY_NAME,
      req.body.COUNTRY_ID
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
    await poolConnect;
    const result = await deleteCity(pool, req.params.id);
    if (result === null || result === {}) {
      res.send(404, "City with id:" + req.params.id + " DOES NOT EXIST.");
    }
    res.send(200, result);
  } catch (error) {
    next(error);
  } finally {
    sql.close();
  }
});

export default router;
