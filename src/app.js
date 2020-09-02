const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");

const models = require("./models");
const sequelize = require("./utils/database");
const moviesRoutes = require("./routes/movies");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, autorization"
  );
  next();
});

app.get("/", (req, res, next) =>
  res.json({ info: "Node.js, Express, and Postgres API" })
);

app.use("/movies", moviesRoutes);

Object.values(models).forEach(model => {
  model.init(sequelize);
  model.initRelationsAndHooks();
});

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize: Connection has been established successfully.");
    app.listen(port);
  })
  .then(() => {
    console.log("Server running on port " + port);
  })
  .catch(err => {
    console.log(err);
  });
