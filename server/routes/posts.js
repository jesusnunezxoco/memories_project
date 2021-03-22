import express from "express"
const router = express.Router()
import {getPosts, createPost, deletePost} from "../controllers/posts.js"

router.get("/", getPosts)
router.post("/", createPost)
router.delete("/:id", deletePost)



export default router