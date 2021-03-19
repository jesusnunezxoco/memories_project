import React from 'react'
import Post from "./Post/Post"
import useStyles from "./styles"
export default function Posts() {
    const classes = useStyles()
    return (
        <div>
            <h1>Posts</h1>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}
