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
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const showForId = async () => {
  const posts = await JsonRequestSingleton.getInstance().getRequest(
    `posts/${id}`
  );
  const author = await JsonRequestSingleton.getInstance().getRequest(
    `authors/${posts.author}`
  );
  const commentInfo = await JsonRequestSingleton.getInstance().getRequest(
    `comments/?postId=${posts.id}`
  );
  const users = await JsonRequestSingleton.getInstance().getRequest(`users/1`);

  // Display the information
  document.querySelector(".title").innerText = posts.title;
  document.querySelector(".subtitle").innerText = posts.subTitle;
  document.querySelector(".cover").src = posts.image;
  document.querySelector(".synopsis").innerText = posts.body;
  document.querySelector(".icon-calendar").innerText = ` ${posts.createDate}`;
  document.querySelector(".icon-heart").innerText = ` ${posts.likes || 0}`;
  document.querySelector(
    ".author-name"
  ).innerText = `Author: ${author.name} ${author.lastName}`;

  // Here I got all the id tags
  const idTags = [];
  posts.tags.map((elem) => {
    idTags.push(elem);
  });

  // Make likes to the post
  const likeButton = document.querySelector(".likes");
  const numberOfLikes = document.querySelector(".icon-heart");
  let count = 0;
  likeButton.addEventListener("click", async (e) => {
    // console.log(e.target.elements);
    try {
      count = count + 1;
      const countingLikes = posts.likes + count;
      const likesOnCLick = (numberOfLikes.value = countingLikes);
      const countLikes = (numberOfLikes.innerText = likesOnCLick);
      const editPost = {
        title: posts.title,
        subTitle: posts.subTitle,
        image: posts.image,
        author: posts.author,
        body: posts.body,
        createDate: posts.createDate,
        tags: idTags,
        likes: countLikes,
      };
      const jsonData = JSON.stringify(editPost);
      await JsonRequestSingleton.getInstance().patchRequest(jsonData, id);
    } catch (error) {
      console.log(error);
    }
  });

  // show the comments
  const showComment = document.querySelector(".show-comment");
  commentInfo.map(async (result, index) => {
    const users = await JsonRequestSingleton.getInstance().getRequest(
      `users/${result.user}`
    );
    showComment.innerHTML += `
            <div class="user-name">${index + 1}. User: ${users.name} ${
      users.lastName
    }  </div>
            <div>Comment: ${result.comment}</div>
            `;
  });

  const userSelect = document.querySelector("#users-dropdown");
  const commentText = document.querySelector("#comment-text");
  const createCommentForm = document.querySelector(".comment-form");

  createCommentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("click en comment");
    let valid = true;
    if (commentText.value === "") {
      document.querySelector(".user-advertising").innerText = "Empty field";
      valid = false;
    } else {
      document.querySelector(".user-advertising").innerText = "";
    }
    if (valid) {
      addNewComment(userSelect, commentText, id);
    }
  });
};

showForId();

// add new comment
const addNewComment = async (user, commentText, postId) => {
  const comment = {
    user: user.value,
    comment: commentText.value,
    postId: postId,
  };
  const jsonData = JSON.stringify(comment);
  try {
    await JsonRequestSingleton.getInstance().postRequest(jsonData, "comments");
  } catch (error) {
    console.log(error);
  }
};

// dropdown of users
const showUsers = async () => {
  const usersDropDown = document.querySelector("#users-dropdown");
  try {
    const users = await JsonRequestSingleton.getInstance().getRequest(`users`);
    console.log(users);
    users.map((result) => {
      const opt = document.createElement("option");
      opt.value = result.id;
      opt.text = `${result.name} ${result.lastName}`;
      usersDropDown.appendChild(opt);
    });
  } catch (error) {}
};
showUsers();

// Click to edit page
const clickToEditPage = () => {
  const editIcon = document.querySelector(".icon-pencil");
  editIcon.addEventListener("click", () => {
    window.location.href = `../editPost.html?id=${id}`;
  });
};
clickToEditPage();

// Delete a Post
const deletePost = async () => {
  const deleteIcon = document.querySelector(".icon-bin2");
  deleteIcon.addEventListener("click", async () => {
    await JsonRequestSingleton.getInstance().deleteRequest(id);
    window.location.href = "../index.html";
  });
};

deletePost();
