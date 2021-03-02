const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const statusSchema = new Schema({
 
  date: {
    type: Date,
    require: true
  },
  step: {
    type: String,
    require: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job'
  }

});

const Status = model("state", statusSchema);

module.exports = Status;