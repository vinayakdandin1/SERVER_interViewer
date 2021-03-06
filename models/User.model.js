const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")


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
    type:String
  }, 
  resume: [String],
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job'
  },
  imageProfile: {
    type: String
  }
});

const User = model("user", userSchema);

module.exports = User;
