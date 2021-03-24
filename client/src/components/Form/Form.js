import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

export default function Form({ currentId, setCurrentId }) {
  const initialState = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    // if an existing post is being edited
    // find that post using currentId from the state
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  // if a current post was selected
  // set the form's postData to the current post
  // so user can see previous information and edit rather than recreate
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId) {
      // if an existing post is selected
      // send currentId (via params) and postData (via body)
      // currentId finds the post that needs to be updated
      // postData provides the updated post
      console.log(currentId)
      dispatch(updatePost(currentId, postData));
    } else {
      // send postData via body to create a new post
      dispatch(createPost(postData));
    }
    // reset the state once something is submitted
    setCurrentId(null)
    setPostData(initialState);
  };

  const clear = (event) => {
    event.preventDefault()
    setCurrentId(null)
    setPostData(initialState);
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="true"
        className={`${classes.root} ${classes.form}`}
        onSubmit={() => handleSubmit()}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          {currentId ? "Update Post" : "Submit Post"}
        </Button>
        <Button
          className={classes.buttonSubmit}
          onClick={clear}
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
