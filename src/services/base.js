class Base {
  run(data) {
    return this.validate(data)
      .then(cleanData => {
        return this.execute(cleanData);
      })
      .catch(err => {
        const error = this.validator.getErrors();
        throw { status: 403, data: "Not valid data" };
      });
  }
}

module.exports = Base;
