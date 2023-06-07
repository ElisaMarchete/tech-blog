const router = require("express").Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      attributes: ["name", "post_date", "title", "post_text"],
      order: [["post_date", "DESC"]],
    });
    const allPosts = postData.map((post) => post.get({ plain: true }));
    //post.get({ plain: true }) will contain plain JavaScript objects representing each post, instead of Sequelize model instances.
    console.log({ allPosts });

    res.render("homepage", { allPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
