const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    //checking email
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // if new user, create it or allow to register;

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      profileImages: req.file.path,
    });

    const token = generateToken(user);
    return res.status(200).send({ user: user, token: token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checked if mail exists
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }

    //if email exists, check password;
    const match = user.checkPassword(req.body.password);
   

    // if it doesn't match
    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    // if it matches
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };
