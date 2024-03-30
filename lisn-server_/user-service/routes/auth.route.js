const express = require("express");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();
const {
  login,
  getUserRole,
  getCurrentUser,
  myUserData,
} = require("../controllers/authentication.controller");

router.post("/login", login);
router.get("/current-role", authMiddleware.authenticateToken, getUserRole);
router.get("/current-user", authMiddleware.authenticateToken, getCurrentUser);
router.get("/my-data", authMiddleware.authenticateToken, myUserData);

module.exports = router;
