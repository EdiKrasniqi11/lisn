const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.user_email,
    role: user.user_role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "8h" });
}

module.exports = {
  generateToken,
};
