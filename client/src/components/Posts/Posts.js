import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

export default function Posts({currentId, setCurrentId}) {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} md={6}>
          <Post post={post} item setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>
  );
}
