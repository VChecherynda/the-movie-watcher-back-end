const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class FindAll extends Base {
  async validate() {
    const rules = true;

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate();
  }

  async execute() {
    const allMovies = await Movie.findAll({
      order: [["title", "ASC"]]
    });

    if (allMovies) {
      return { status: 200, data: allMovies };
    }

    return { status: 404, data: "Nothing found" };
  }
}

module.exports = FindAll;
