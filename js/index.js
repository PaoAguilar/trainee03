import JsonRequestSingleton from "./singleton.js";
const tagsContainer = document.querySelector(".tags-container");
const allPostsContainer = document.querySelector(".allposts-container");
const lastThreeContainer = document.querySelector(".last-three-container");
const remainingContainer = document.querySelector(".remaining-container");

const managerMenu = document.querySelector("#manager");

managerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("HI EN MANAGER");
  window.location.href = "../postManager.html";
});

const showTags = async () => {
  try {
    const tags = await JsonRequestSingleton.getInstance().getRequest("tags");
    // console.log(tags[0].name);

    tags.map((result) => {
      tagsContainer.innerHTML += `
        <button class="tag-button"><span class="icon icon-price-tag"> ${result.name}</span></button>
        `;
    });
    const tagButton = document.querySelectorAll(`.tag-button`);
    tagButton.forEach((element, index) => {
      element.addEventListener("click", () => {
        showPostForTags(index + 1);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// show posts when click the tag
const showPostForTags = async (clickedTag) => {
  try {
    const postForTagContainer = document.querySelector(
      ".posts-for-tag-container"
    );
    postForTagContainer.innerHTML = "";
    const posts = await JsonRequestSingleton.getInstance().getRequest(
      `posts?tags_like=${clickedTag}`
    );
    posts.map((result) => {
      console.log(result);
      if (result === []) {
        postForTagContainer.innerHTML += `
        <div class="post">
            <h3>There are not posts with this tag</h3>
        </div>
        `;
      } else {
        postForTagContainer.innerHTML += `
        <div class="post">
            <img src="${result.image}"/>
        </div>
        `;
      }
    });
  } catch (error) {}
};

const showPosts = async () => {
  try {
    const posts = await JsonRequestSingleton.getInstance().getRequest("posts");

    console.log(posts);
    const lastThree = posts.slice(8);
    console.log(lastThree);

    // showing last three posts
    lastThree.map((result) => {
      lastThreeContainer.innerHTML += `
        <div class="post">
            <img src="${result.image}"/>
            <p class="post-info">Hojhkjhkjhkjhla</p>
        </div>
        `;
    });
    // showing remaining posts
    const startIndexToRemove = posts.length - 3;
    const remainingPosts = posts.slice(0, startIndexToRemove);
    remainingPosts.map((result) => {
      remainingContainer.innerHTML += `
              <div class="post">
                  <img src="${result.image}"/>
              </div>
              `;
    });

    // showing all posts
    const showDescPosts = posts.reverse();
    showDescPosts.map((result) => {
      allPostsContainer.innerHTML += `
          <div class="post">
              <img src="${result.image}"/>
          </div>
          `;
    });
  } catch (error) {}
};

showTags();
showPosts();
