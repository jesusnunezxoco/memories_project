import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// All the handlers for our routes

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPost = async (req, res) => {
  let {id} = req.params
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const { ...post } = req.body;
  const newPost = new PostMessage(post);
  console.log(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { ...post } = req.body;
  // *check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No posts with id: ${id}`);

  try {
    const updatedPost = { ...post, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deletePost = async (req, res) => {
  const requestedId = req.params.id;

  try {
    console.log("Deleted ID: ", requestedId);
  } catch (error) {
    res.status(409).json(error);
  }
};
