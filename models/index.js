const Posts = require("./Posts");
const User = require("./User");
const Comments = require("./Comments.js");

// Comment belongsTo Post
// Comments.belongsTo(Posts, {
//   foreignKey: "post_id",
// });

module.exports = { Posts, User, Comments };
