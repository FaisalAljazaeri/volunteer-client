import apiUrl from "../../apiConfig";
import axios from "axios";

// Get All Posts
const getAllPosts = () => {
  return axios.get(`${apiUrl}/posts`);
};

// Delete Post By ID
const deletePostById = id => {
  return axios.delete(`${apiUrl}/posts/${id}`);
};

// Create a new Post
const createPost = post => {
  return axios.post(`${apiUrl}/posts`, post);
};

// Edit Post By Id and export it
const editPostById = (id, updatedPost) => {
  return axios.patch(`${apiUrl}/posts/${id}`, { posts: updatedPost });
};

export { getAllPosts, deletePostById, createPost, editPostById };
