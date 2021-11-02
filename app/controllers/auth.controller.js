// Base Controller
const BaseController = require("./base.controller");

// User model
const mongoose = require("mongoose");

// models
const User = mongoose.model("User");

// Error
const AuthError = require("@errors/auth.error");

// Resource
const UserResource = require("@resources/user.resource");

class LoginController extends BaseController {
  constructor() {
    super();
  }

  // Login by credentials
  login = async (req, res, next) => {
    try {
      // request
      const { email, password } = req.body;

      // Verify email, password is valid or not
      const user = await User.findByCredentials(email, password);

      // Generate new token
      const access_token = await user.generateAuthToken();

      // Response
      let userResource = new UserResource(user).exec();
      res.send(this.responseSingle({ auth: userResource, access_token }));
    } catch (error) {
      next(error);
    }
  };

  // Logout
  logout = async (req, res, next) => {
    // Log user out of the application
    try {
      // remove token from list
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token;
      });

      await req.user.save();
      res.send(
        this.responseSingle(null, "logout successfully.")
      );
    } catch (error) {
      next(error);
    }
  };

  // Remove all tokens this user (Logout all devices)
  logoutAll = async (req, res, next) => {
    // Log user out of all devices
    try {
      req.user.tokens.splice(0, req.user.tokens.length);
      await req.user.save();

      res.send(
        this.responseSingle(null, "logout all devices successfully.")
      );
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    // Log user out of all devices
    try {
      // Response
      let userResource = new UserResource(req.user).exec();
      res.send(this.responseSingle(userResource));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new LoginController();
