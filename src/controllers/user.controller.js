const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(200).send(error.message);
  }
});

module.exports=router