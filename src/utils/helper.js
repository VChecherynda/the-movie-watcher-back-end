const renderPromiseAsJson = (promise, res) =>
  promise
    .then(({ status, data }) => res.status(status).json(data))
    .catch(({ status, data }) => res.status(status).json(data));

const isNull = x => (x === null ? [] : x);

module.exports = {
  renderPromiseAsJson,
  isNull
};
