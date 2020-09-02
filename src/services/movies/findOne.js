const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class FindOne extends Base {
  async validate(data) {
    const rules = {
      id: ["required"]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { id = "" } = cleanData;

    const savedMovie = await Movie.findByPk(id);

    console.log("[id]", id);
    console.log("[savedMovie]", savedMovie);

    if (!savedMovie) {
      return { status: 404, data: "There no such movie" };
    }

    const { title, release, format, stars } = savedMovie;

    return { status: 200, data: { id, title, release, format, stars } };
  }
}

module.exports = FindOne;
