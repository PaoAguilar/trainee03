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

// searching id from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// display info to edit
const showInfoToEdit = async () => {
  const posts = await JsonRequestSingleton.getInstance().getRequest(
    `posts/${id}`
  );

  const movieNameDisplay = document.querySelector("#movie");
  const subtitleDisplay = document.querySelector("#subtitle");
  const coverDisplay = document.querySelector("#cover");
  const authorDisplay = document.querySelector("#author");
  const dateDisplay = document.querySelector("#date");
  const contentDisplay = document.querySelector("#content");

  document.querySelector("#movie").value = posts.title;
  document.querySelector("#subtitle").value = posts.subTitle;
  document.querySelector("#cover").value = posts.image;
  document.querySelector("#author").value = posts.author;
  document.querySelector("#date").value = posts.createDate;
  document.querySelector("#content").value = posts.body;
  const editForm = document.querySelector(".edit-form");

  const tagCheckBoxes = document.getElementsByClassName("checked");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkedTags = [];
    Array.from(tagCheckBoxes).forEach((checkBox) => {
      if (checkBox.checked) {
        checkedTags.push(+checkBox.value);
      }
    });
    editNewPost(
      movieNameDisplay,
      subtitleDisplay,
      coverDisplay,
      authorDisplay,
      dateDisplay,
      contentDisplay,
      checkedTags
    );
    console.log("click en edir");
  });
};

const editNewPost = async (
  movieName,
  subtitle,
  cover,
  author,
  date,
  content,
  tags
) => {
  const posts = await JsonRequestSingleton.getInstance().getRequest(
    `posts/${id}`
  );
  const editPost = {
    title: movieName.value,
    subTitle: subtitle.value,
    image: cover.value,
    author: author.value,
    createDate: date.value,
    body: content.value,
    tags: tags,
    likes: posts.likes,
  };
  const jsonData = JSON.stringify(editPost);
  try {
    await JsonRequestSingleton.getInstance().patchRequest(jsonData, id);
    window.location.href = `../postInfo.html?id=${id}`;
  } catch (error) {
    console.log(error);
  }
};
showInfoToEdit();
