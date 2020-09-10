const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

const { ITEMS_PER_PAGE } = require("../../config");

class FindAll extends Base {
  async validate(data) {
    const rules = {
      page: ["required"]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { page } = cleanData;

    const allMovies = await Movie.findAndCountAll({
      order: [["title", "ASC"]],
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE
    });

    const { count: total, rows: items } = allMovies;
    const hasNextPage = ITEMS_PER_PAGE * page < total;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const prevPage = page - 1;
    const lastPage = Math.ceil(total / ITEMS_PER_PAGE);

    if (allMovies) {
      return {
        status: 200,
        data: {
          total,
          items,
          hasNextPage,
          hasPreviousPage,
          nextPage,
          prevPage,
          lastPage
        }
      };
    }

    return { status: 404, data: "Nothing found" };
  }
}

module.exports = FindAll;
