const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv").config().parsed;
const productRoutes = require("./routes/product.route.js");
const userRoleRoutes = require("./routes/user_role.route.js");
const userStateRoutes = require("./routes/user_state.route.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const queryRoutes = require("./routes/query.route.js");
const axios = require("axios");
const { createAdminUser } = require("./controllers/user.controller.js");
const { upload } = require("./utils/imageMiddleware.js");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

//admin configuration
createAdminUser();

//routes
app.use("/api/products", productRoutes);
app.use("/api/user-roles", userRoleRoutes);
app.use("/api/user-states", userStateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authentication", authRoutes);
app.use("/api/search", queryRoutes);

//FILE UPLOAD
app.post("/api/upload", upload.single("user_image"), (req, res) => {
  res.status(200).json(req.file);
});

//COUNTRY API
app.get("/api/countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=flags,name"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

//IMAGE API
app.get("/api/images/:name", async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "uploads", req.params.name);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(path.resolve(imagePath), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error while sending file" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
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
