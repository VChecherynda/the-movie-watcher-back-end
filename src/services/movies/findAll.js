const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class FindAll extends Base {
  async validate(data) {
    const rules = {
      quantity: ["required"]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { quantity = "" } = cleanData;

    if (quantity === "all") {
      const allMovies = Movie.findAllEntities();
      return { status: 200, data: allMovies };
    }

    return { status: 404, data: "Nothing found" };
  }
}

module.exports = FindAll;
