// bcrypt 
const bcrypt = require('bcrypt')

// json web token
const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");

// Authenticate error
const AuthError = require('@errors/auth.error');

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      match: /\S+@\S+\.\S+/,
      index: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    image: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "users", versionKey: false }
);

UserSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10)
  }

  next()
});

UserSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

UserSchema.statics.findByCredentials = async function (email, password) {
  // Search for a user by email and password.
  const user = await User.findOne({ email} )
  if (!user) {
      throw new AuthError('login failed! your email or password is invalid.')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
      throw new AuthError('login failed! your email or password is invalid.')
  }

  return user
}

const User = mongoose.model("User", UserSchema);
