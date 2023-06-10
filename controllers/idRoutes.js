// http://localhost:3001/:id ---> CHANGE ID TO BE POST ID
// Able to add comment to the existing post when user is logged in

const router = require("express").Router();
const { Posts } = require("../models");

router.get("/:postId", withAuth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const getPostbyId = await Posts.findByPk({
      attributes: ["name", "post_date", "title", "post_text"],
    });
    const onePost = getPostbyId.map((post) => post.get({ plain: true }));
    //post.get({ plain: true }) will contain plain JavaScript objects representing each post, instead of Sequelize model instances.
    console.log({ onePost });

    res.send(`Clicked post ID: ${postId}`);
    res.render("commentpost", { onePost, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
