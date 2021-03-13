import JsonRequestSingleton from "./singleton.js";
const postManagerMenuButton = document.querySelector("#manager");
const homeMenuButton = document.querySelector("#home");
const searchInput = document.querySelector(".search-box");
const postForTitleContainer = document.querySelector(
  ".post-by-title-container"
);
// Menu buttons
postManagerMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../postManager.html";
});
homeMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../index.html";
});

const setPost = (e) => {
  if (e.keyCode == 13) {
    console.log(`pressing enter`);
    if (searchInput.value === "") {
      const advertising = document.createElement("span");
      advertising.innerText = `Please enter something`;
      console.log("enter somthing");
    } else {
      getPostBytitle(searchInput.value);
      searchInput.value = "";
      postForTitleContainer.innerHTML = "";
    }
  }
};
searchInput.addEventListener("keypress", setPost);

const getPostBytitle = async (title) => {
  try {
    const posts = await JsonRequestSingleton.getInstance().getRequest(
      `posts?title_like=${title}`
    );
    posts.map((result) => {
      console.log(result);
      postForTitleContainer.innerHTML += `
        <div class="post">
            <img src="${result.image}"/>
        </div>
        `;
    });

    console.log(posts);
  } catch (error) {}
};
setPost;
