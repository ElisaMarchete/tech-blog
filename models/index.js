const Posts = require("./Posts");
const User = require("./User");
const Comments = require("./Comments.js");

// Comment belongsTo Post
Comments.belongsTo(Posts, {
  foreignKey: "comments_posts_id",
  onDelete: "CASCADE",
});
// Post hasMany Comment
Posts.hasMany(Comments, {
  foreignKey: "comments_posts_id",
  onDelete: "CASCADE",
});

// Post belongsTo User
Posts.belongsTo(User, {
  foreignKey: "user_posts_id",
  onDelete: "CASCADE",
});

// user hasMany posts
User.hasMany(Posts, {
  foreignKey: "user_posts_id",
  onDelete: "CASCADE",
});

module.exports = { Posts, User, Comments };
