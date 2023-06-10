const router = require("express").Router();
const { Posts } = require("../models");

// http://localhost:3001/
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      attributes: ["name", "post_date", "title", "post_text", "id"],
      order: [["post_date", "DESC"]],
    });
    const allPosts = postData.map((post) => post.get({ plain: true }));
    //post.get({ plain: true }) will contain plain JavaScript objects representing each post, instead of Sequelize model instances.
    console.log({ allPosts });

    res.render("homepage", { allPosts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// http://localhost:3001/login
// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// http://localhost:3001/signup
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("signup");
});

// http://localhost:3001/post/1
router.put("/:id", async (req, res) => {
  try {
    const postData = await Posts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
