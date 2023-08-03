import express from "express";
import sql from "mssql";
import dotenv from "dotenv";
import {
  getCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  updateCountry,
} from "../queries/countries.js";

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
    const countries = await getCountries(pool);
    res.send(200, countries);
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
    const country = await getCountryById(pool, req.params.id);
    if (country === null || country === {}) {
      res.send(404, "Country with id " + req.params.id + " does not exist.");
    } else {
      res.send(200, country);
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
    const result = await createCountry(
      pool,
      req.body.COUNTRY_NAME,
      req.body.COUNTRY_ICON
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
    const result = await updateCountry(
      pool,
      req.body.COUNTRY_ID,
      req.body.COUNTRY_NAME,
      req.body.COUNTRY_ICON
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
    const result = await deleteCountry(pool, req.params.id);
    if (result === null || result === {}) {
      res.send(404, "Country with id:" + req.params.id + " DOES NOT EXIST.");
    }
    res.send(200, result);
  } catch (error) {
    next(error);
  } finally {
    sql.close();
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
