const { DataTypes, UUIDV4 } = require("sequelize");
// const { v4: UUIDV4 } = require("uuid");

const Base = require("./base");

class Movie extends Base {}

Movie.options = {
  modelName: "movie"
};

Movie.schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
    defaultValue: UUIDV4
  },
  title: { type: DataTypes.STRING, allowNull: false },
  release: { type: DataTypes.STRING, allowNull: false },
  format: { type: DataTypes.STRING, allowNull: false },
  stars: { type: DataTypes.STRING, allowNull: false }
};

module.exports = Movie;
