const authService = require("../services/login");
const UserRole = require("../models/user_role.model");
const User = require("../models/user.model");

async function login(req, res) {
  try {
    const { username, user_password } = req.body;
    const token = await authService.login(username, user_password);
    res.json({ ACCESS_TOKEN: token });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

async function getUserRole(req, res) {
  foundRole = await UserRole.findById(req.user.role);
  if (!foundRole) {
    return res.status(500).json({ message: "User role is not correct" });
  }
  return res.status(200).json({ role: foundRole.role_name });
}

async function getCurrentUser(req, res) {
  foundUser = await User.findOne({ username: req.user.username })
    .populate("user_role", "role_name")
    .populate("user_state", "state_name");
  foundRole = await UserRole.findById(req.user.role);
  if (!foundUser || !foundRole) {
    return res.status(404).json({ message: "User is not found" });
  }
  return res
    .status(200)
    .json({ username: foundUser.username, role: foundRole.role_name });
}

async function myUserData(req, res) {
  const foundUser = await User.findOne({ username: req.user.username })
    .populate("user_role", "role_name")
    .populate("user_state", "state_name");
  if (!foundUser) {
    return res.status(404).json({ message: "User is not found" });
  }
  return res.status(200).json(foundUser);
}

module.exports = { login, getUserRole, getCurrentUser, myUserData };
