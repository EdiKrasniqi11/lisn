const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field is required"],
      unique: [true, "This username is already taken"],
    },
    user_email: {
      type: String,
      required: [true, "Email field is required"],
      unique: [true, "This email is already taken"],
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    user_password: {
      type: String,
      required: [true, "Password is required"],
    },
    birth_date: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    user_image: {
      type: String,
      required: false,
    },
    user_country: {
      type: String,
      required: [true, "Please select a country"],
    },
    user_role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_role",
      required: [true, "Please select a role"],
      default: "65df7cc25c0960bff80a1837",
    },
    user_state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_state",
      required: [true, "Please select a state"],
      default: "65df8807d4dd1e64e07def69",
    },
    unsuccessful_login_attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("user_password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    user.user_password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
