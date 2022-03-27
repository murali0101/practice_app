
const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const authenticate =require("../middleware/authenticate")

const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {

     const page = req.query.page || 1;
     const pagesize = req.query.pagesize || 10;
     const skip = (page - 1) * pagesize;
     const totalPages = Math.ceil(
       (await Post.find().countDocuments()) / pagesize
     );
     const post = await Post.find().skip(skip).limit(pagesize).lean().exec();
     return res.status(200).send({ post: post, totalPages: totalPages });
 
  } catch (error) {
    return res.status(200).send(error.message);
  }
});
router.post("/",authenticate, async (req, res) => {
  try {
          req.body.userId = req.user; 
    const post = await Post.create(req.body)
    return res.status(200).send(post);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});
router.patch("/:id",authenticate, async (req, res) => {
  try {
          req.body.userId = req.user; 
    const post = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true})
      .lean()
      .exec();
    return res.status(200).send(post);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});
router.delete("/:id",authenticate, async (req, res) => {
  try {
          req.body.userId = req.user; 
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.status(200).send(post);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});

module.exports = router;