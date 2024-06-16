const express = require("express");
const router = express.Router();
const {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/subGenre.controller");

router.get("/", getGenres);
router.post("/", createGenre);
router.put("/", updateGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
