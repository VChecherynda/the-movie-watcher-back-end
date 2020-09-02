const Create = require("../services/movies/create");
const Delete = require("../services/movies/delete");
const Find = require("../services/movies/find");

const { renderPromiseAsJson } = require("../utils/helper");

module.exports = {
  create: (req, res) => {
    const data = req.body;

    const service = new Create();
    const promise = service.run({ data });

    renderPromiseAsJson(promise, res);
  },
  delete: (req, res) => {
    const data = req.body;

    const service = new Delete();
    const promise = service.run({ data });

    renderPromiseAsJson(promise, res);
  },
  find: (req, res) => {
    const { id } = req.params;

    const service = new Find();
    const promise = service.run({ id });

    renderPromiseAsJson(promise, res);
  }
};
