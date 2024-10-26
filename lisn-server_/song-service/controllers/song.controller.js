const Song = require("../models/song.model.js");

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).populate("artist", "username");
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.find({}).populate("artist", "username");
    res.status(200).json(song);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getSongs,
  getSongById,
};
