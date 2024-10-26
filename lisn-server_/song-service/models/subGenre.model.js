const mongoose = require("mongoose");

const SubGenreSchema = mongoose.Schema(
  {
    sub_name: {
      type: String,
      required: [true, "Sub genre name is required"],
    },
    genre: {
      type: mongoose.Types.ObjectId,
      ref: "genre",
      required: [true, "Parent Genre is required"],
    },
  },
  {
    timestamps: true,
  }
);

const SubGenre = mongoose.model("sub_genre", SubGenreSchema);
module.exports = SubGenre;
