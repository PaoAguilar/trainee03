const movieName = document.querySelector("#movie");
const subtitle = document.querySelector("#subtitle");
const cover = document.querySelector("#cover");
const author = document.querySelector("#author");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
const createButton = document.querySelector(".create-button");
createButton.addEventListener("click", () => {
  if (movieName.value === "") {
    document.querySelector(".name-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".name-advertising").innerText = "";
  }
  if (subtitle.value === "") {
    document.querySelector(".subtitle-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".subtitle-advertising").innerText = "";
  }
  if (cover.value === "") {
    document.querySelector(".cover-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".cover-advertising").innerText = "";
  }
  if (author.value === "") {
    document.querySelector(".author-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".author-advertising").innerText = "";
  }
  if (date.value === "") {
    document.querySelector(".date-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".date-advertising").innerText = "";
  }
  if (content.value === "") {
    document.querySelector(".content-advertising").innerText = "Empty field";
  } else {
    document.querySelector(".content-advertising").innerText = "";
  }
});
