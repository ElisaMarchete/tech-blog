const router = require("express").Router();
const { Posts } = require("../../models");

// CREATE POST -> http://localhost:3001/api/dashboard
router.post("/", async (req, res) => {
  // console.log(req.body.title, req.session.user_id, req.body.post_text);
  try {
    const newpostData = await Posts.create({
      post_date: req.body.post_date,
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

// UPDATE POST -> http://localhost:3001/api/dashboard
router.put("/", async (req, res) => {
  try {
    const updatePost = await Posts.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE POST -> http://localhost:3001/api/dashboard
router.delete("/", async (req, res) => {
  try {
    const deletePost = await Posts.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(deletePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
