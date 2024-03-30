const express = require("express");
const router = express.Router();
const { searchUsers } = require("../controllers/query.controller");

router.get("/users", searchUsers);

module.exports = router;
