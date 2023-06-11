const commentBox = document.querySelector("#comment-box");
const postsBoxes = document.querySelectorAll(".posts-box");
const btnAddComment = document.querySelector("#btn-add-comment");
const displayComment = document.querySelector(".display-comment");

postsBoxes.forEach((post) => {
  post.addEventListener("click", function (e) {
    // display the comment box when the post is clicked
    commentBox.style = "display: flex";
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
    commentBox.setAttribute("comment-post-id", getPostId);
    // console.log(box);
  });
});

// add event listener to the add comment button
btnAddComment.addEventListener("click", function (e) {
  // get the post id from the comment box
  const postId = commentBox.getAttribute("comment-post-id");

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
    // Here, 'data' contains the parsed response data
    .then((data) => {
      console.log(data);
      // hide the comment box to display only the new comment
      commentBox.style = "display: none";

      // display the author name and comment text and date
      displayComment.innerHTML = `
      <div class="newCommentDisplay">
            <div class="comment-text">
            <p>${data.comment_text}</p>
           </div>
            <div class="comment-author-date">
            <p>--- ${data.name}  ${data.comment_date}</p>
            </div>
         </div>
      </div>
      </div>
      `;
    });
});
