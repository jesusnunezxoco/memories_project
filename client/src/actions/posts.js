import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api";

// *Action Creators
// *functions that return an action
// *uses redux-thunk to handle async actions like api calls

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = { type: CREATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log("actions data", data)
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id, post) => async (dispatch) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, post) => async (dispatch) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
