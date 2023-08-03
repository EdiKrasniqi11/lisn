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

router.get("/", async (req, res, next) => {
  try {
    const countries = await getCountries(sql, config);
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
    const country = await getCountryById(sql, config, req.params.id);
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
    const result = await createCountry(
      sql,
      config,
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
    const result = await updateCountry(
      sql,
      config,
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
    const result = await deleteCountry(sql, config, req.params.id);
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

export default router;
