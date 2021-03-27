// import "dotenv/config.js";
import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

app.use("/posts", postRoutes);

app.use("/", (req, res) => {
  res.send("Connected! Go to /posts for the api!")
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))