const router = require("express").Router();
const { Comments, User } = require("../../models");

// CREATE COMMENT
// http://localhost:3001/api/comments
router.post("/", async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.user_id;

    // Create a new comment
    const dbUserData = await Comments.create({
      comment_text: req.body.comment_text,
      user_posts_id: userId,
      comments_posts_id: req.body.post_id,
    });

    // Get the associated user for the comment
    const dbUser = await User.findByPk(userId);
    res.status(200).json({ dbUserData, dbUser });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
