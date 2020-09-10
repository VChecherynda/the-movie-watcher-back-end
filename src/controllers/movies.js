const Create = require("../services/movies/create");
const Upload = require("../services/movies/upload");
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
  upload: (req, res) => {
    const file = req.files;

    const service = new Upload();
    const promise = service.run({ file });

    renderPromiseAsJson(promise, res);
  },
  delete: (req, res) => {
    const { id } = req.params;

    const service = new Delete();
    const promise = service.run({ id });

    renderPromiseAsJson(promise, res);
  },
  findAll: (req, res) => {
    const { page = 1 } = req.params;

    const service = new FindAll();
    const promise = service.run({ page });

    renderPromiseAsJson(promise, res);
  },
  findOne: (req, res) => {
    const { id } = req.params;

    const service = new FindOne();
    const promise = service.run({ id });

    renderPromiseAsJson(promise, res);
  }
};
