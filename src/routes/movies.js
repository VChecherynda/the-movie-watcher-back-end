const express = require("express");
const router = express.Router();

const controllerMovies = require("../controllers/movies");

router.post("/create", controllerMovies.create);
router.delete("/delete", controllerMovies.delete);
router.get("/find/:id", controllerMovies.find);

module.exports = router;
