const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("user_role", "role_name")
      .populate("user_state", "state_name");
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("user_role", "role_name")
      .populate("user_state", "state_name");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.user_image = req.file.filename;
    }
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createAdminUser = async () => {
  try {
    const user = await User.findOne({ username: "admin" });
    if (!user) {
      const createdUser = await User.create({
        username: "admin",
        user_email: "admin@admin.com",
        user_password: "Password@123",
        birth_date: "01/02/1001",
        user_country: "undefined",
        user_role: "65df7ce95c0960bff80a1839",
      });
      return createdUser;
    }
  } catch (e) {}
};

const updateUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.user_image = req.file.filename;
    }
    const user = await User.findByIdAndUpdate(req.body._id, req.body);
    if (!user) {
      res.status(404).json({ message: "User role not found" });
    }
    const updatedUser = await User.findById(req.body._id);
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ message: "No image inserted" });
    }
    const filename = req.file.filename;
    if (
      !filename.endsWith(".png") &&
      !filename.endsWith(".jpg") &&
      !filename.endsWith(".ico")
    ) {
      return res.status(500).json({ message: "Invalid Image Type" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.user_image = req.file.filename;
    await User.findByIdAndUpdate(req.params.id, user);
    const updatedUser = await User.findById(req.params.id);
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const isPasswordValid = await bcrypt.compare(
      req.body.old_password,
      foundUser.user_password
    );
    if (isPasswordValid) {
      const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
      foundUser.user_password = hashedPassword;
      const updatedUser = await User.findByIdAndUpdate(
        foundUser._id,
        foundUser
      );
      res.status(200).json(updatedUser);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createAdminUser,
  updateUserImage,
  updateUserPassword,
};
