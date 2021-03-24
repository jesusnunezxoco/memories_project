import axios from "axios"

const url = "http://localhost:5000/posts"

export const fetchPosts = () => axios.get(url);
export const fetchOnePost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)