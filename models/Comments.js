const { Model, DataTypes } = require("sequelize");
const moment = require("moment");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: moment().format("DD/MM/YY"),
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments_posts_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comments",
  }
);

module.exports = Comments;
