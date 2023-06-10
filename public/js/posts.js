const box = document.querySelector("#comment-box");
const postsBoxes = document.querySelectorAll(".posts-box");
// console.log(postsBoxes);

// for each to add listener click to each post
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
    console.log(box);
  });
});

// hide the other posts
