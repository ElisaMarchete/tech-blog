const router = require("express").Router();
const { Posts } = require("../../models");

// CREATE new post
// http://localhost:3001/api/dashboard
router.post("/", async (req, res) => {
  try {
    const newpostData = await Posts.create({
      title: req.body.title,
      name: "bbb",
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
