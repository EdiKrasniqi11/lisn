const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  try {
    const existingUserEmail = await User.findOne({ user_email: email });
    const existingUserUsername = await User.findOne({ username: email });

    if (!existingUserEmail && !existingUserUsername) {
      throw new Error("User not found");
    }

    const existingUser = existingUserEmail
      ? existingUserEmail
      : existingUserUsername;

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.user_password
    );
    if (!isPasswordValid) {
      existingUser.unsuccessful_login_attempts += 1;
      await User.findByIdAndUpdate(existingUser._id, existingUser);
      throw new Error("Password is iconrrect");
    }
    const token = generateToken(existingUser);
    return token;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  login,
};
