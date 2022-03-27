const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");
const authenticate = require("../middleware/authenticate");

const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find().lean().exec();
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});
router.post("/", authenticate, async (req, res) => {
  try {
     req.body.userId = req.user; 
    const comment = await Comment.create(req.body);
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});

module.exports = router;
