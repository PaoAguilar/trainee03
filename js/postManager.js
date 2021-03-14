import JsonRequestSingleton from "./singleton.js";

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

// setting todays date
const date = new Date();
const creationDate = document.querySelector("#date");
creationDate.value = `${date.getFullYear()}/${
  date.getMonth() + 1
}/${date.getDate()}`;
creationDate.setAttribute("disabled", "");

const showAuthors = async () => {
  try {
    const authors = await JsonRequestSingleton.getInstance().getRequest(
      `authors`
    );
    console.log(authors);
    const authorInput = document.querySelector("#author");
    const dropDown = document.querySelector(".dropdown");

    authorInput.value = `${authors[0].name} ${authors[0].lastName}`;

    authorInput.addEventListener("click", () => {
      console.log("hi");
      authors.map((result) => {
        const authorElement = document.createElement("li");
        const line = document.createElement("hr");
        console.log(result);
        authorElement.classList.add("author-dropdown");
        authorElement.innerText = `${result.name} ${result.lastName}`;
        authorElement.addEventListener("click", () => {
          authorInput.value = `${result.name} ${result.lastName}`;
          dropDown.innerHTML = "";
        });
        dropDown.appendChild(authorElement);
        dropDown.appendChild(line);
      });
    });
  } catch (error) {}
};

showAuthors();
