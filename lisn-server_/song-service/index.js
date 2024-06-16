const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const genreRoutes = require("./routes/genre.route");
const subGenresRoutes = require("./routes/subGenre.route");
const { getAudioBPM } = require("./controllers/audioProcessingController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use("/api/genres", genreRoutes);
app.use("/api/sub-genres", subGenresRoutes);

app.get("/api/", (req, res) => {
  getAudioBPM();
  res.status(200).send("Welcome to the Song Service API");
});

//MONGOOSE SETUP
mongoose
  .connect(env.DB_CONNECTION_STRING)
  .then(() => {
    app.listen(env.PORT_NUMBER, () => {
      console.log(`server listening on port ${env.PORT_NUMBER}`);
    });
  })
  .catch(() => {
    console.log("DATABASE CONNECTION FAILED");
  });
