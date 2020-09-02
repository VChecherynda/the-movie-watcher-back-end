const Create = require("../services/movies/create");
const Delete = require("../services/movies/delete");
const FindAll = require("../services/movies/findAll");
const FindOne = require("../services/movies/findOne");

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
  findAll: (req, res) => {
    const service = new FindAll();
    const promise = service.run();

    renderPromiseAsJson(promise, res);
  },
  findOne: (req, res) => {
    const { id } = req.params;

    const service = new FindOne();
    const promise = service.run({ id });

    renderPromiseAsJson(promise, res);
  }
};
