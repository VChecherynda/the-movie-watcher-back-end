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
    const currentPage = Number(page);
    const lastPage = Math.ceil(total / ITEMS_PER_PAGE);
    const nextPage = Number(page) + 1 > lastPage ? lastPage : Number(page) + 1;
    const prevPage = Number(page) - 1 < 1 ? 1 : Number(page) - 1;
    const hasNextPage = ITEMS_PER_PAGE * page < total;
    const hasPreviousPage = page > 1;

    if (allMovies) {
      return {
        status: 200,
        data: {
          total,
          items,
          currentPage,
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
