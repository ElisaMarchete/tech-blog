const router = require("express").Router();
const { Posts, User } = require("../../models");

// CREATE new post
// http://localhost:3001/api/dashboard
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

// Get the posts created by the logged in user
// http://localhost:3001/api/dashboard
router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;

    const postData = await Posts.findAll({
      where: { user_id: userId }, // Fetch only posts created by the logged-in user
      attributes: ["post_date", "user_posts_id", "title", "post_text", "id"], // "post_date"
      order: [["post_date", "DESC"]],
      include: [{ model: User }],
    });

    const userPosts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { userPosts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post when the user clicks on the edit button
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

// Delete a post when the user clicks on the delete button

module.exports = router;
