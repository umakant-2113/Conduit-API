var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const formatData = require("../helpers/formatdata");
let { userProfile, userJSON, articleformat } = formatData;


// create  a new user Register (no authentication is required)
router.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    let token = user.signToken();
    res.status(201).json({ user: userJSON(user, token) });
  } catch (error) {
    next(error);
  }
});


// user login   with email and password
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "both password and email is required" });
    }
    let user = await User.findOne({ email: email });

    // if the user is not exits in the database
    if (!user) {
      return res.status(400).json({ error: "user is not registered" });
    }

    // if the user is exits then compare  the password
    let isMatched = await bcrypt.compare(password, user.password);

    // if the password is not matched
    if (!isMatched) {
      return res.status(400).json({ error: "user password is not matched" });
    }
    
    // if user password is mathced then generate  the user  jwt token
    // and send it to the user
    let token = user.signToken();
    res.status(202).json({ user: userJSON(user, token) });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
