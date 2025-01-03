import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

//Get Method
export const getPost = () => {
  return api.get("/posts");
};
//Delete Method

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//Post Method

export const postData = (post) => {
  return api.post("/posts", post);
};

//update Method

export const updatePost = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
