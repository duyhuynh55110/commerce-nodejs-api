// json web token
const jwt = require("jsonwebtoken");

// User model
const mongoose = require("mongoose");
const User = mongoose.model("User");

// middleware
const AuthError = require("@errors/auth.error");

const auth = async (req, res, next) => {
  try {
    let token = null;

    // get bearer token
    if(typeof req.header("Authorization") == "string") {
        token = req.header("Authorization").replace("Bearer ", "");
    }

    // Verify bearer token valid
    const data = jwt.verify(token, process.env.JWT_KEY);
    if(!data) {
      throw new AuthError('token failed.');
    }
    
    // Find user information
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      throw new AuthError();
    }

    // Set to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
