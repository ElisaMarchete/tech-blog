const router = require("express").Router();
const { Posts, User } = require("../../models");

// CREATE new post
// http://localhost:3001/api/dashboard
router.post("/", async (req, res) => {
  // console.log(req.body.title, req.session.user_id, req.body.post_text);
  try {
    const newpostData = await Posts.create({
      title: req.body.title,
      user_posts_id: req.session.user_id,
      post_text: req.body.post_text,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(newpostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get the posts created by the logged in user
// http://localhost:3001/api/dashboard
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const postbyUser = await Posts.findByPk(userId, {
      attributes: ["user_posts_id", "post_date", "title", "post_text", "id"],
      order: [["post_date", "DESC"]],
      include: [{ model: User }],
    });
    // console.log(postData);
    const allPosts = postbyUser.map((post) => post.get({ plain: true }));
    //post.get({ plain: true }) will contain plain JavaScript objects representing each post, instead of Sequelize model instances.
    // console.log({ allPosts });

    res.render("homepage", { allPosts, loggedIn: req.session.loggedIn }); // loggedIn will be used to determine whether or not to display the login/logout links in the header
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
