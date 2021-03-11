import JsonRequestSingleton from "./singleton.js";
const tagsContainer = document.querySelector(".tags-container");
const allPostsContainer = document.querySelector(".allposts-container");
const lastThreeContainer = document.querySelector(".last-three-container");
const remainingContainer = document.querySelector(".remaining-container");

const showTags = async () => {
  try {
    const tags = await JsonRequestSingleton.getInstance().getRequest("tags");
    console.log(tags[0].name);

    tags.map((result) => {
      tagsContainer.innerHTML += `
        <button class="tag-button"><span class="icon icon-price-tag"> ${result.name}</span></button>
        `;
    });
  } catch (error) {
    console.log(error);
  }
};

const showPosts = async () => {
  try {
    const posts = await JsonRequestSingleton.getInstance().getRequest("posts");
    // console.log(posts);
    const lastThree = posts.slice(8);
    console.log(lastThree);
    console.log(posts);
    // showing last three posts
    lastThree.map((result) => {
      lastThreeContainer.innerHTML += `
        <div class="post">
            <img src="${result.image}"/>
        </div>
        `;
    });
    // showing all posts
    posts.map((result) => {
      allPostsContainer.innerHTML += `
          <div class="post">
              <img src="${result.image}"/>
          </div>
          `;
    });
  } catch (error) {}
};

// const showRemaining = async () => {
//   try {
//     const posts = await JsonRequestSingleton.getInstance().getRequest("posts");
//     const startIndexToRemove = posts.length - 3;
//     console.log(posts.splice(startIndexToRemove, 3));
//     // const remaingingPosts = posts.splice(8);
//     // lastThree.map((result) => {
//     //   lastThreeContainer.innerHTML += `
//     //               <div class="post">
//     //                   <img src="${result.image}"/>
//     //               </div>
//     //               `;
//     // });
//   } catch (error) {}
// };

showTags();
showPosts();
// showRemaining();
// showAllPosts();
