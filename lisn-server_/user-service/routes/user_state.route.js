const express = require("express");
const router = express.Router();
const {
  getUserStates,
  getUserStateById,
  createUserState,
  updateUserState,
  deleteUserState,
} = require("../controllers/user_state.controller.js");

router.get("/", getUserStates);
router.get("/:id", getUserStateById);
router.post("/", createUserState);
router.put("/", updateUserState);
router.delete("/:id", deleteUserState);

module.exports = router;
