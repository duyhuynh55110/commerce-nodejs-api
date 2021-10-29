const mongoose = require("mongoose");

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
  },
  { collection: "users", versionKey: false }
);

mongoose.model("User", UserSchema);
