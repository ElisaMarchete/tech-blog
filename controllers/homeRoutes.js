const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Posts, User } = require("../models");

// GET ALL POSTS -> http://localhost:3001/
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

    res.render("homepage", {
      allPosts,
      loggedIn: req.session.loggedIn,
    }); // loggedIn will be used to determine whether or not to display the login/logout links in the header
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN route ->http://localhost:3001/login
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// SIGNUP -> http://localhost:3001/signup
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'signup' template
  res.render("signup");
});

// DASHBOARD -> http://localhost:3001/api/dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    console.log(req.session.user_id);

    const postData = await Posts.findAll({
      where: { user_posts_id: userId },
      // where: { user_id: userId }, // Fetch only posts created by the logged-in user
      attributes: ["user_posts_id", "post_date", "title", "post_text", "id"],
      order: [["post_date", "DESC"]],
      include: [{ model: User }],
    });

    const userPosts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { userPosts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
