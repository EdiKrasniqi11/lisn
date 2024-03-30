const express = require("express");
const { upload } = require("../utils/imageMiddleware.js");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserImage,
  updateUserPassword,
} = require("../controllers/user.controller.js");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("user_image"), createUser);
router.put("/", upload.single("user_image"), updateUser);
router.patch("/:id", upload.single("user_image"), updateUserImage);
router.put("/update-password/:id", updateUserPassword);
router.delete("/:id", deleteUser);

module.exports = router;
