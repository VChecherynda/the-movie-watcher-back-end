class Base {
  run(data) {
    return this.validate(data)
      .then(cleanData => {
        console.log("[cleanData]", cleanData);
        return this.execute(cleanData);
      })
      .catch(err => {
        console.log("[err]", err);
        const error = this.validator.getErrors();
        throw { status: 403, data: "Problem with data" };
      });
  }
}

module.exports = Base;
