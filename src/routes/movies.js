const express = require("express");
const router = express.Router();

const controllerMovies = require("../controllers/movies");

router.post("/create", controllerMovies.create);
router.post("/upload", controllerMovies.upload);
router.delete("/delete/:id", controllerMovies.delete);
router.get("/find/:page", controllerMovies.findAll);
router.get("/find-one/:id", controllerMovies.findOne);

module.exports = router;
