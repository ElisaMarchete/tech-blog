const router = require("express").Router();
const { Comments } = require("../../models");

// CREATE new comment
// http://localhost:3001/api/comments
router.post("/", async (req, res) => {
  try {
    const dbUserData = await Comments.create({
      post_text: req.body.comment_text,
      name: "bbb",
      comments_posts_id: req.body.post_id,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new comment
// http://localhost:3001/api/comments/:id
// router.get(`/${postCommentId}`, async (req, res) => {
//   try {
//     const dbUserData = await Comments.findByPk({
//       post_text: req.body.comment_text,
//       name: "bbb",
//     });

//     // Set up sessions with a 'loggedIn' variable set to `true`
//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
