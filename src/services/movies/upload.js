const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);
const { v4: UUIDV4 } = require("uuid");

const {
  replaceAllMatchingWords,
  serializeString
} = require("../../utils/helper");

const Movie = require("../../models/movie");
const Base = require("../base");

class Upload extends Base {
  async validate(data) {
    const rules = {
      file: ["required"]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { file = {} } = cleanData;

    const txtString = file.file.data.toString("utf8");

    const txtStringReplaced = replaceAllMatchingWords({
      string: txtString,
      currentWord: "Release Year",
      newWord: "Release"
    });

    const serializedData = serializeString(txtStringReplaced);

    await Movie.bulkCreate(serializedData);

    const allMovies = await Movie.findAll();

    return { status: 200, data: allMovies };
  }
}

module.exports = Upload;
