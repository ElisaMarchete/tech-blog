const btnnewpost = document.querySelector("#btn-new-post");
const createnewpost = document.querySelector("#create-new-post");
const btnsubmitpost = document.querySelector("#btn-add-new-post");
const btneditpost = document.querySelectorAll("#btn-edit-post");
const btndeletepost = document.querySelector("#btn-delete-post");
const btnupdatepost = document.querySelector("#btn-update-post");
const updatepostForm = document.querySelector("#update");
const postsBoxes = document.querySelectorAll(".posts-box");
const editField = document.querySelector("#edit");
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

btneditpost.forEach((edit) => {
  edit.addEventListener("click", function (e) {
    const id = e.target.dataset.id;
    // Get the post id
    editField.value = id;
    // show the form to edit the post
    updatepostForm.style.display = "flex";

    // hide the other posts when one is clicked
    postsBoxes.forEach((post) => {
      if (post.id.split("-")[1] !== id) {
        post.style = "display: none";
      }
    });
    // hide new post button
    btnnewpost.style.display = "none";
  });
});

// when user click to update the post the data will be sent to the database
btnupdatepost.addEventListener("click", async function (e) {
  // get the data from the form created in the dashboard.handlebars
  const title = document.querySelector(".edit-title").value;
  const post_text = document.querySelector(".edit-body").value;
  const id = editField.value;
  console.log(title, post_text, id);

  // send the data to the database using fetch
  const result = await fetch("/api/dashboard/", {
    method: "PUT",
    body: JSON.stringify({
      // title and post_text are the variables from the web page handlebars
      id,
      title,
      post_text,
    }),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("/dashboard");
  return result.json();
});
