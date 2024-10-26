const SubGenre = require("../models/subGenre.model");

const getGenres = async (req, res) => {
  try {
    const genres = await SubGenre.find({}).populate("genre");
    res.status(200).json(genres);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createGenre = async (req, res) => {
  try {
    const genre = await SubGenre.create(req.body);
    res.status(200).json(genre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const genre = await SubGenre.findByIdAndUpdate(req.body._id, req.body);
    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
    }
    const updatedGenre = await SubGenre.findById(req.body._id);
    res.status(200).json(updatedGenre);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genre = await SubGenre.findByIdAndDelete(req.params.id);
    if (!genre) {
      res.status(404).send({ message: "Genre not found" });
    }
    res.status(200).send({ message: "Genre deleted sucessfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
