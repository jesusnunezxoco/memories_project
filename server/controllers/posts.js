import PostMessage from "../models/postMessage.js";

// All the handlers for our routes

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { ...post } = req.body;
  const newPost = new PostMessage(post);
  console.log(post)
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const requestedId = req.params.id;

  try {
    console.log("Deleted ID: ", requestedId);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
