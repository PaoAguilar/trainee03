import JsonRequestSingleton from "./singleton.js";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

const showForId = async () => {
  const posts = await JsonRequestSingleton.getInstance().getRequest(
    `posts/${id}`
  );
  console.log(posts);
};

showForId();
