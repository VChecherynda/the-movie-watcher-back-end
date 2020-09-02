const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class Create extends Base {
  async validate(data) {
    const rules = {
      data: [
        "required",
        {
          nested_object: {
            title: "required",
            release: ["required", { min_length: 4 }],
            format: "required",
            stars: "required"
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

    const savedMovie = await Movie.findOneEntity("title", data.title);

    if (savedMovie) {
      return { status: 401, data: "This movie is already exist" };
    }

    const newMovie = await Movie.create(data);
    const { id, title, release, format, stars } = newMovie;

    return { status: 200, data: { id, title, release, format, stars } };
  }
}

module.exports = Create;
