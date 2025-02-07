const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
      validate: [isEmail, "Enter a valid mail address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
