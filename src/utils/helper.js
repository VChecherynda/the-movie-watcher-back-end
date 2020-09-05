const renderPromiseAsJson = (promise, res) =>
  promise
    .then(({ status, data }) => res.status(status).json(data))
    .catch(({ status, data }) => res.status(status).json(data));

const isNull = x => (x === null ? [] : x);

const replaceAllMatchingWords = ({ string, currentWord, newWord }) => {
  return string.replace(new RegExp(currentWord, "g"), newWord);
};

const serializeString = data => {
  const result = data.toLowerCase().split(/\n\s*\n/);

  return result.reduce((acc, item) => {
    if (typeof item === "string") {
      const block = item.split("\n");
      const newBlock = {};

      block.forEach(item => {
        const clearedItem = item.replace(" ", "");
        const pair = clearedItem.split(":");

        const key = pair[0] || "";
        const value = pair[1] || "";

        if (key) {
          return (newBlock[key] = value);
        }
      });

      acc.push(newBlock);
    }

    return acc;
  }, []);
};

module.exports = {
  replaceAllMatchingWords,
  serializeString,
  renderPromiseAsJson,
  isNull
};
