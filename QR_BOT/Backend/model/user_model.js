const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
