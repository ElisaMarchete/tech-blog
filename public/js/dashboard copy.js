const btnnewpost = document.querySelector("#btn-new-post");
const createnewpost = document.querySelector("#create-new-post");
const btnsubmitpost = document.querySelector("#btn-add-new-post");
const btneditpost = document.querySelector("#btn-edit-post");
const btndeletepost = document.querySelector("#btn-delete-post");
const postbox = document.querySelectorAll(".posts-box");

// when user click to create new post the form will show up
btnnewpost.addEventListener("click", function () {
  createnewpost.style.display = "flex";
  btnnewpost.style.display = "none";
});

// when user click to submit the new post the data will be sent to the database
btnsubmitpost.addEventListener("click", function () {
  // get the data from the form created in the dashboard.handlebars
  const title = document.querySelector("#posts-new-title").value;
  const post_text = document.querySelector("#new-body").value;

  // send the data to the database using fetch
  fetch("/api/dashboard", {
    method: "POST",
    body: JSON.stringify({
      // title and post_text are the variables from the web page handlebars
      title,
      post_text,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      // go back to the dashboard page
      window.location.replace("/dashboard");
      return response.json(); // Parse the response body as JSON
    })
    // Here, 'data' contains the parsed response data
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

postbox.forEach((editpost) => {
  editpost.addEventListener("click", function (e) {
    // show and hide the buttons
    btneditpost.style.display = "flex";
    btndeletepost.style.display = "flex";
    btnnewpost.style.display = "none";
    //split the post id information to get the id number
    getPostId = editpost.id.split("-")[1];
    console.log(getPostId);

    // hide the other posts when one is clicked
    // postbox.forEach((editpost) => {
    //   if (editpost.id.split("-")[1] !== getPostId) {
    //     editpost.style = "display: none";
    //   }
    // });

    // add the post id to the comment id
    // commentBox.setAttribute("comment-post-id", getPostId);
    // console.log(box);
  });
});

// add event listener to the add edit button
btneditpost.addEventListener("click", function (e) {
  // get the post id from the comment box
  // const postId = commentBox.getAttribute("comment-post-id");
  // console.log(postId);

  // get the comment text from the comment box
  let editPostTitle = document.querySelector(".posts-title").value;
  let editPostText = document.querySelector(".posts-text").value;

  // send the post id and comment text to the server
  fetch(`/api/dashboard/:${getPostId}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: parseInt(getPostId), // FIX POST ID
      title: editPostTitle,
      post_text: editPostText,
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
      // commentBox.style = "display: none";

      // display the author name and comment text and date
      // displayComment.innerHTML = `
      // <div class="newCommentDisplay">
      //       <div class="comment-text">
      //       <p>${data.comment_text}</p>
      //      </div>
      //       <div class="comment-author-date">
      //       <p>--- ${data.name}  ${data.comment_date}</p>
      //       </div>
      //    </div>
      // </div>
      // </div>
      // `;
    });
});
