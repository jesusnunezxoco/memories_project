import React from "react";
import {useDispatch} from "react-redux"
import {deletePost} from "../../../actions/posts"
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
export default function Post({ post, setCurrentId }) {
  const classes = useStyles();

  const dispatch = useDispatch()

  const createdTime = moment(post.createdAt).fromNow();

  let backupImage =
    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

  const cardMedia = (
    <CardMedia
      className={classes.media}
      image={post.selectedFile || backupImage}
      title={post.title}
    />
  );
  const cardOverlays = (
    <>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{createdTime}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
    </>
  );

  const cardTags = (
    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">
        {post.tags.map((tag) => `#${tag} `)}
      </Typography>
    </div>
  );

  const cardTitle = (
    <Typography
      className={classes.title}
      gutterBottom
      variant="h5"
      component="h2"
    >
      {post.title}
    </Typography>
  );

  const cardContent = (
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {post.message}
      </Typography>
    </CardContent>
  );

  const cardActions = (
    <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" onClick={() => console.log("like+")}>
        <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{" "}
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => dispatch(deletePost(post._id))}
      >
        <DeleteIcon fontSize="small" /> Delete
      </Button>
    </CardActions>
  );

  return (
    <Card className={classes.card}>
      {cardMedia}
      {cardOverlays}
      {cardTags}
      {cardTitle}
      {cardContent}
      {cardActions}
    </Card>
  );
}
