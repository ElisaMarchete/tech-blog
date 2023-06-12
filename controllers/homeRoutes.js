const router = require("express").Router();
const { Posts, User } = require("../models");

// http://localhost:3001/
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      attributes: ["user_posts_id", "post_date", "title", "post_text", "id"],
      order: [["post_date", "DESC"]],
      include: [{ model: User }],
    });
    // console.log(postData);
    const allPosts = postData.map((post) => post.get({ plain: true }));
    //post.get({ plain: true }) will contain plain JavaScript objects representing each post, instead of Sequelize model instances.
    // console.log({ allPosts });

    res.render("homepage", { allPosts, loggedIn: req.session.loggedIn }); // loggedIn will be used to determine whether or not to display the login/logout links in the header
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
  // Otherwise, render the 'signup' template
  res.render("signup");
});

// http://localhost:3001/api/dashboard
router.get("/dashboard", (req, res) => {
  // If the user is not logged in, redirect to the homepage
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'dashboard' template
  res.render("dashboard");
});

module.exports = router;
