const box = document.querySelector("#comment-box");
const postsBoxes = document.querySelectorAll(".posts-box");

// document.querySelectorALL(".posts-box");
// for each to add listener to each post box

postsBoxes.forEach((post) => {
  post.addEventListener("click", function (e) {
    box.style = "display: block";
  });
});
