const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    song_name: {
      type: String,
      required: [true, "Song name is required"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Artist is required"],
    },
    song_path: {
      type: String,
      required: [true, "Song audio is required"],
    },
    song_image: {
      type: String,
      required: false,
    },
    main_image_color: {
      type: String,
      required: false,
    },
    song_viewability: {
      type: Boolean,
      default: true,
    },
    song_description: {
      type: String,
      required: false,
    },
    song_bpm: {
      type: Number,
      required: false,
    },
    song_key: {
      type: String,
      required: false,
    },
    song_subgenre: {
      type: mongoose.Types.ObjectId,
      ref: "sub-genre",
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("song", SongSchema);
module.exports = Song;
