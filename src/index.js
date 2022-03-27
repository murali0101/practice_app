const express = require("express");
const app = express();

app.use(express.json());
const { register, login } = require("./controllers/auth.controller");
const fileUpload = require("./middleware/file_upload");
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const commentController = require("./controllers/comment.controller");
const postlikeController = require("./controllers/post_like.controller");

app.post("/register", fileUpload.single("profileImages"), register);

app.post("/login", login);


app.use("/user",userController)
app.use("/post", postController);
app.use("/comment", commentController);
app.use("/post_like", postlikeController);
module.exports = app;
