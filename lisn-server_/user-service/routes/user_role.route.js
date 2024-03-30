const express = require("express");
const router = express.Router();
const {
  getUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/user_role.controller.js");

router.get("/", getUserRoles);
router.get("/:id", getUserRoleById);
router.post("/", createUserRole);
router.put("/", updateUserRole);
router.delete("/:id", deleteUserRole);

module.exports = router;
