const router = require("express").Router();
const { Posts } = require("../models");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({});

    res.render("homepage", {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
