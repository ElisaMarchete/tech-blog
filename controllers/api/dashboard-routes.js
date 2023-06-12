const router = require("express").Router();
const { Posts } = require("../../models");

// CREATE new post
// http://localhost:3001/api/dashboard
router.post("/", async (req, res) => {
  console.log(req.body.title, req.session.user_id, req.body.post_text);
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

module.exports = router;
