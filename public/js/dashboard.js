const btnnewpost = document.querySelector("#btn-new-post");
const createnewpost = document.querySelector("#create-new-post");
const btnsubmitpost = document.querySelector("#btn-add-new-post");

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
