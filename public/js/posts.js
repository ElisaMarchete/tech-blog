const box = document.querySelector("#comment-box");
const postsBoxes = document.querySelectorAll(".posts-box");
const btnAddComment = document.querySelector("#btn-add-comment");

// check if user is logged in

postsBoxes.forEach((post) => {
  post.addEventListener("click", function (e) {
    // display the comment box when the post is clicked
    box.style = "display: block";
    //split the post id information to get the id number
    getPostId = post.id.split("-")[1];
    // console.log(getPostId);

    // hide the other posts when one is clicked
    postsBoxes.forEach((post) => {
      if (post.id.split("-")[1] !== getPostId) {
        post.style = "display: none";
      }
    });

    // add the post id to the comment id
    box.setAttribute("comment-post-id", getPostId);
    // console.log(box);
  });
});

// add event listener to the add comment button
btnAddComment.addEventListener("click", function (e) {
  // get the post id from the comment box
  const postId = box.getAttribute("comment-post-id");

  // get the comment text from the comment box
  let commentText = document.querySelector(".text-box").value;

  // send the post id and comment text to the server
  fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id: parseInt(postId),
      comment_text: commentText,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json(); // Parse the response body as JSON
    })
    .then((data) => {
      // Here, 'data' contains the parsed response data
      // console.log(data);
      // display the comments on the page after the comment is added
      fetch("/api/comments/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
    });
});
