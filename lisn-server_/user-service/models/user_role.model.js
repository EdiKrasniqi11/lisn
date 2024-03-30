const mongoose = require("mongoose");

const UserRoleSchema = mongoose.Schema(
  {
    role_name: {
      type: String,
      required: [true, "The role name field is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserRole = mongoose.model("user_role", UserRoleSchema);
module.exports = UserRole;
