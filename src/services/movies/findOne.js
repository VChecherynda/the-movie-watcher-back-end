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

  _clearedData(data) {
    const { id = "", title = "", release = "", format = "", stars = "" } = data;

    return {
      id,
      title,
      release,
      format,
      stars
    };
  }

  async execute(cleanData) {
    const { id = "" } = cleanData;

    const savedMovie = await Movie.findByPk(id);

    if (!savedMovie) {
      return { status: 404, data: "There no such movie" };
    }

    const clearedData = this._clearedData(savedMovie);

    return { status: 200, data: clearedData };
  }
}

module.exports = FindOne;
