const Posts = require("./Posts");
const User = require("./User");

// Products belongsTo Category
// Product.belongsTo(Category, {
//     foreignKey: "category_id",
//   });

module.exports = { Posts, User };
