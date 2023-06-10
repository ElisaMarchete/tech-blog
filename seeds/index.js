const sequelize = require("../config/connection");
const { Posts } = require("../models");
// const { Comments } = require("../models");

const userData = require("./userData.json");
// const commentData = require("./commentData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Posts.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Comments.bulkCreate(commentData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedAll();
