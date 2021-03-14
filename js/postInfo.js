import JsonRequestSingleton from "./singleton.js";

const homeMenuButton = document.querySelector("#home");
const postManagerMenuButton = document.querySelector("#manager");
const searchMenuButton = document.querySelector("#search");

homeMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../index.html";
});
postManagerMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../postManager.html";
});
searchMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../searchPost.html";
});

// searching id from url
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

const showForId = async () => {
  const info = document.querySelector(".info");
  const posts = await JsonRequestSingleton.getInstance().getRequest(
    `posts/${id}`
  );
  console.log(posts.id);
  const author = await JsonRequestSingleton.getInstance().getRequest(
    `authors/${posts.author}`
  );
  const commentInfo = await JsonRequestSingleton.getInstance().getRequest(
    `comments/?postId=${posts.id}`
  );
  const users = await JsonRequestSingleton.getInstance().getRequest(`users/1`);
  console.log(commentInfo);

  info.innerHTML += `
        <h1 class="title">${posts.title}</h1>
        <h2 class="subtitle">${posts.subTitle}</h2>
        <img class="cover" src="${posts.image}" alt="" />
        <div class="synopsis">${posts.body}</div>
        <div class="show-icons">
            <div class="show-icon-info">
                <div class="create-date"><span class="icon icon-calendar"> ${
                  posts.createDate
                }</span></div>
                <div class="likes"><span class="icon icon-heart"> ${
                  posts.likes || 0
                }</span></div>
                <div class="author"><span class="icon">Author: ${author.name} ${
    author.lastName
  }</span></div>
            </div>
            <h2 class="comment"><span class="icon icon-bubbles2"> Comments for the movie</span></h2>
            <div class="show-comment">
            </div>
            
        </div>
  `;
  const likeButton = document.querySelector(".likes");
  const numberOfLikes = document.querySelector(".icon-heart");
  const like = {
    likes: numberOfLikes.value,
  };
  const jsonData = JSON.stringify(like);
  let count = 0;
  console.log(numberOfLikes);
  likeButton.addEventListener("click", async (e) => {
    try {
      // await JsonRequestSingleton.getInstance().putRequest(jsonData, id);
      const likes = (numberOfLikes.value = ++count);
      numberOfLikes.innerText = ` ${likes}`;
    } catch (error) {
      console.log(error);
    }
  });

  const showComment = document.querySelector(".show-comment");
  commentInfo.map((result) => {
    showComment.innerHTML += `
            <div>User: Comment: ${result.comment}</div>
            `;
  });
  //   console.log(posts);
};
showForId();

const deletePost = async () => {
  const deleteIcon = document.querySelector(".icon-bin2");
  deleteIcon.addEventListener("click", async () => {
    console.log("click icon");
    await JsonRequestSingleton.getInstance().deleteRequest(id);
    window.location.href = "../index.html";
  });
};

deletePost();
