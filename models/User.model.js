const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  emailId: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type:String,
    require: true
  }, 
  resume: []
});

const User = model("user", userSchema);

module.exports = User;
