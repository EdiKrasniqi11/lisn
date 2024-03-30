const UserRole = require("../models/user_role.model.js");

const getUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.find({});
    res.status(200).json(userRoles);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUserRoleById = async (req, res) => {
  try {
    const userRole = await UserRole.findById(req.params.id);
    if (!userRole) {
      res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(userRole);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.create(req.body);
    res.status(200).json(userRole);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findByIdAndUpdate(req.body._id, req.body);
    if (!userRole) {
      res.status(404).json({ message: "User role not found" });
    }
    const updatedUserRole = await UserRole.findById(req.body._id);
    res.status(200).json(updatedUserRole);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findByIdAndDelete(req.params.id);
    if (!userRole) {
      res.status(404).json({ message: "User role not found" });
    }
    res.status(200).json({ message: "User role deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
};
