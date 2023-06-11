const btnnewpost = document.querySelector("#btn-new-post");
const createnewpost = document.querySelector("#create-new-post");

btnnewpost.addEventListener("click", function () {
  createnewpost.style.display = "flex";
  btnnewpost.style.display = "none";
});

// {{! presented with any blog posts I have already created }}
