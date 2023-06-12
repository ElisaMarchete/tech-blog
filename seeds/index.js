const sequelize = require("../config/connection");
const { Posts } = require("../models");
const { User } = require("../models");

const userData = require("./userData.json");
const userInfo = require("./userInfo.json");
// const commentData = require("./commentData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userInfo, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // await Posts.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedAll();
