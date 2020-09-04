const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);
const { v4: UUIDV4 } = require("uuid");

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
    const { data = {} } = cleanData;
    const { title = "" } = data;

    if (!title) {
      return { status: 403, data: "Not valid data 123" };
    }

    const savedMovie = await Movie.findOneEntity("title", title);

    if (savedMovie) {
      return { status: 401, data: "This movie is already exist" };
    }

    const createdMovie = await Movie.create({ id: UUIDV4(), ...data });
    const clearedData = this._clearedData(createdMovie);

    return { status: 201, data: clearedData };
  }
}

module.exports = Create;
