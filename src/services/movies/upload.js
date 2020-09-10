const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

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

    try {
      await Promise.all(
        serializedData.map(async element => {
          const { title, release, format, stars } = element;

          await Movie.findOrCreate({
            where: { title, release, format, stars },
            defaults: { title, release, format, stars }
          });
        })
      );

      const allMovies = await Movie.findAll({
        order: [["title", "ASC"]]
      });

      return { status: 200, data: allMovies };
    } catch (err) {
      return { status: 403, data: "Not expectable document format" };
    }
  }
}

module.exports = Upload;
