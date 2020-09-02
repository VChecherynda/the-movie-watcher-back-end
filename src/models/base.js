const Sequelize = require("sequelize");

class Base extends Sequelize.Model {
  static init(sequelize, options = {}) {
    super.init(this.schema, { sequelize, ...this.options });
  }

  static initRelationsAndHooks() {
    if (this.initRelations) this.initRelations();
    if (this.initHooks) this.initHooks();
  }

  static async findOneEntity(field, value) {
    const query = {
      where: { [field]: value }
    };

    const entity = await this.findOne(query);

    return entity;
  }

  static async findAllEntities(fields) {
    const query = {
      attributes: fields
    };

    const entity = await this.findAll(query);

    return entity;
  }
}

module.exports = Base;
