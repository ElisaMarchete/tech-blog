const { Posts } = require("../models");

const postsdata = [
  {
    name: "Elisa",
    post_date: "2023-06-06",
    post_text: "I have mixed feelings about handlebars.",
  },
];

const seedPosts = () => Posts.bulkCreate(postsdata);

module.exports = seedPosts;
