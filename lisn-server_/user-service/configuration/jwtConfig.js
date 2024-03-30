const crypto = require("crypto");

//Generate key
const secret_key = crypto.randomBytes(32).toString("hex");

module.exports = {
  secretKey: "9db5adf988c316c298096202cd614445eae1179cad30545ee64774434d4e0a19",
};
