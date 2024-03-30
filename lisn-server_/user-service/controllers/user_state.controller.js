const UserState = require("../models/user_state.model.js");

const getUserStates = async (req, res) => {
  try {
    const userStates = await UserState.find({});
    res.status(200).json(userStates);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUserStateById = async (req, res) => {
  try {
    const userState = await UserState.findById(req.params.id);
    if (!userState) {
      res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(userState);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createUserState = async (req, res) => {
  try {
    const userState = await UserState.create(req.body);
    res.status(200).json(userState);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserState = async (req, res) => {
  try {
    const userState = await UserState.findByIdAndUpdate(
      req.req.body._id,
      req.body
    );
    if (!userState) {
      res.status(404).json({ message: "User role not found" });
    }
    const updatedUserState = await UserState.findById(req.req.body._id);
    res.status(200).json(updatedUserState);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteUserState = async (req, res) => {
  try {
    const userState = await UserState.findByIdAndDelete(req.params.id);
    if (!userState) {
      res.status(404).json({ message: "User role not found" });
    }
    res.status(200).json({ message: "User role deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getUserStates,
  getUserStateById,
  createUserState,
  updateUserState,
  deleteUserState,
};
