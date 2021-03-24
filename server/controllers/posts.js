import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// All the handlers for our routes

export const getPosts = async (req, res) => {
  try {
    // get posts from newest to oldest
    const posts = await PostMessage.find().sort({createdAt: -1});
    // send posts as JSON
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPost = async (req, res) => {
  let { id } = req.params;
  try {
    // query post from DB
    const post = await PostMessage.findById(id);
    // send a post as JSON
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const { ...post } = req.body;
  // make a new post instance using the PostMessage schema
  const newPost = new PostMessage(post);
  try {
    // save newPost to the DB
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No posts with id: ${id}`);

  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json({ message: `Post message deleted with ID: ${id}` });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No posts with id: ${id}`);

  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};
