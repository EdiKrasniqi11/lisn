import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import user_role_routes from "./routes/user_roles.js";
import user_state_routes from "./routes/user_states.js";
import country_routes from "./routes/countries.js";
import city_routes from "./routes/cities.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user-roles", user_role_routes);
app.use("/user-states", user_state_routes);
app.use("/countries", country_routes);
app.use("/cities", city_routes);

app.get("/", (req, res) => {
  res.send("Welcome to the LISN User Service center");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
