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

// Show authors in the dropdown
const showAuthors = async () => {
  const authorDropDown = document.querySelector("#author");
  try {
    const authors = await JsonRequestSingleton.getInstance().getRequest(
      `authors`
    );
    authors.map((result) => {
      const opt = document.createElement("option");
      opt.value = result.id;
      opt.text = `${result.name} ${result.lastName}`;
      authorDropDown.appendChild(opt);
    });
  } catch (error) {}
};
showAuthors();

// creates a new post
export const createNewPost = async (
  moviePost,
  subtitlePost,
  coverPost,
  authorPost,
  creationDatePost,
  contentPost,
  tags
) => {
  const post = {
    title: moviePost.value,
    subTitle: subtitlePost.value,
    image: coverPost.value,
    author: authorPost.value,
    createDate: creationDatePost.value,
    body: contentPost.value,
    tags: tags,
    likes: 0,
  };
  const jsonData = JSON.stringify(post);
  try {
    await JsonRequestSingleton.getInstance().postRequest(jsonData, "posts");
  } catch (error) {
    console.log(error);
  }
};
