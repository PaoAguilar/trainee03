// import JsonRequestSingleton from "./singleton.js";

const searchMenuButton = document.querySelector("#search");
const homeMenuButton = document.querySelector("#home");

searchMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../searchPost.html";
});
homeMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../index.html";
});
