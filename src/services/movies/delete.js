const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class Delete extends Base {
  async validate(data) {
    const rules = {
      data: [
        "required",
        {
          nested_object: {
            id: "required"
          }
        }
      ]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { data } = cleanData;
    const { id = "" } = data;

    const savedMovie = await Movie.findByPk(id);

    if (!savedMovie) {
      return { status: 404, data: "There no such movie" };
    }

    const movie = await savedMovie.destroy();

    console.log("[movie]", movie);

    return { status: 200, data: { id } };
  }
}

module.exports = Delete;
