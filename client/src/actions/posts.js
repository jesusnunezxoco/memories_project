import * as api from "../api";

// *Action Creators
// functions that return an action
// uses redux-thunk to handle async actions like api calls
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: "FETCH_ALL", payload: data }
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};
