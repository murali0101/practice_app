const express = require("express");
const router = express.Router();
const PostLike = require("../models/post_like.model");
const authenticate = require("../middleware/authenticate");
const Post = require("../models/post.model");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const postLike = await PostLike.find().lean().exec();
    return res.status(200).send(postLike);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});
router.post("/", authenticate, async (req, res) => {
   
  try {
    req.body.userId = req.user;
     let  postLike = await PostLike.findOne({userId:req.body.userId}).lean().exec();
    
           if (!postLike){
            let post = await Post.findOne({_id:req.body.postId});
            let cur_like=post.likes+1
            post = await Post.findByIdAndUpdate(
           req.body.postId,
           { likes: cur_like },
           {
             new: true,
           }
         );
          postLike = await PostLike.create(req.body)
            
      }else{
           let post = await Post.findOne({ _id: req.body.postId });
          
           let cur_like = post.likes - 1;
           await Post.findByIdAndUpdate(
             req.body.postId,
             { likes: cur_like },
             {
               new: true,
             }
           );
         
           
           postLike = await PostLike.findByIdAndDelete({_id:postLike._id});
      }
     
    return res.status(200).send(postLike);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});

module.exports = router;
