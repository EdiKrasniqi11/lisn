const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema(
  {
    genre_name: {
      type: String,
      required: [true, "Genre name is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("genre", GenreSchema);
module.exports = Genre;
