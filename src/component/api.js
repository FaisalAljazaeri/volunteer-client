
import apiUrl from '../../apiConfig';
import axios from 'axios';

// Get All Posts
const getAllPosts = () => {
  return axios.get(`${apiUrl}/posts`);
};
export { getAllPosts}