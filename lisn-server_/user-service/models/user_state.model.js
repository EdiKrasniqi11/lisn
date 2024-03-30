const mongoose = require("mongoose");

const UserStateSchema = mongoose.Schema(
  {
    state_name: {
      type: String,
      required: [true, "The state name field is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserState = mongoose.model('user_state', UserStateSchema);
module.exports = UserState;