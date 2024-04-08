const mongoose = require("mongoose");

const FollowSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Follower missing"],
    },
    followed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Followed missing"],
    },
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.model("follow", FollowSchema);
module.exports = Follow;
