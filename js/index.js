import JsonRequestSingleton from "./singleton.js";
const tagsContainer = document.querySelector(".tags-container");
const allPostsContainer = document.querySelector(".allposts-container");
const lastThreeContainer = document.querySelector(".last-three-container");
const remainingContainer = document.querySelector(".remaining-container");

const postManagerMenuButton = document.querySelector("#manager");
const searchMenuButton = document.querySelector("#search");

postManagerMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../postManager.html";
});
searchMenuButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../searchPost.html";
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
      // console.log(result);
      if (result === []) {
        postForTagContainer.innerHTML += `
        <div class="post">
            <h3>There are not posts with this tag</h3>
        </div>
        `;
      } else {
        postForTagContainer.innerHTML += `
        <div class="post" id="${result.id}">
            <img src="${result.image}"/>
        </div>
        `;
      }
    });
  } catch (error) {}
  const postDiv = document.querySelectorAll(`.post`);
  postDiv.forEach((element, index) => {
    element.addEventListener("click", () => {
      // console.log(`hice click, ${index}`);
      // console.log(element.id);
      window.location.href = `../postInfo.html?id=${element.id}`;
    });
  });
};

const showPosts = async () => {
  try {
    const posts = await JsonRequestSingleton.getInstance().getRequest("posts");

    // console.log(posts);
    const startIndex = posts.length - 3;
    // console.log(startIndex);
    const lastThree = posts.slice(startIndex);
    // console.log(lastThree);

    // showing last three posts
    lastThree.map((result) => {
      lastThreeContainer.innerHTML += `
        <div class="post" id="${result.id}">
            <img src="${result.image}"/
        </div>
        `;
    });

    // showing remaining posts
    const startIndexToRemove = posts.length - 3;
    const remainingPosts = posts.slice(0, startIndexToRemove);
    remainingPosts.map((result) => {
      remainingContainer.innerHTML += `
              <div class="post" id="${result.id}">
                  <img src="${result.image}"/>
              </div>
              `;
    });

    // showing all posts
    const showDescPosts = posts.reverse();
    showDescPosts.map((result) => {
      allPostsContainer.innerHTML += `
          <div class="post" id="${result.id}">
              <img src="${result.image}"/>
          </div>
          `;
    });
  } catch (error) {
    console.log(error);
  }

  const postDiv = document.querySelectorAll(`.post`);
  postDiv.forEach((element, index) => {
    element.addEventListener("click", () => {
      // console.log(`hice click, ${index}`);
      // console.log(element.id);
      window.location.href = `../postInfo.html?id=${element.id}`;
    });
  });
};

showTags();
showPosts();
