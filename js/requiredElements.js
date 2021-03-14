import { createNewPost } from "./postManager.js";
const movieName = document.querySelector("#movie");
const subtitle = document.querySelector("#subtitle");
const cover = document.querySelector("#cover");
const author = document.querySelector("#author");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
const createForm = document.querySelector(".create-form");
const tagCheckBoxes = document.getElementsByClassName("checked");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkedTags = [];
  Array.from(tagCheckBoxes).forEach((checkBox) => {
    if (checkBox.checked) {
      checkedTags.push(+checkBox.value);
    }
  });
  // console.log("hey");
  // console.log(e.target.elements);
  let valid = true;
  if (movieName.value === "") {
    document.querySelector(".name-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".name-advertising").innerText = "";
  }
  if (subtitle.value === "") {
    document.querySelector(".subtitle-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".subtitle-advertising").innerText = "";
  }
  if (cover.value === "") {
    document.querySelector(".cover-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".cover-advertising").innerText = "";
  }
  if (author.value === "") {
    document.querySelector(".author-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".author-advertising").innerText = "";
  }
  if (date.value === "") {
    document.querySelector(".date-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".date-advertising").innerText = "";
  }
  if (content.value === "") {
    document.querySelector(".content-advertising").innerText = "Empty field";
    valid = false;
  } else {
    document.querySelector(".content-advertising").innerText = "";
  }
  if (valid) {
    createNewPost(
      movieName,
      subtitle,
      cover,
      author,
      date,
      content,
      checkedTags
    );
    window.location.href = "../index.html";
  }
});
