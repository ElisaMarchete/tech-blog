const sequelize = require("../config/connection");
const { Posts } = require("../models");

const userData = require("./userData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Posts.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();
