const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose")

const statusSchema = new Schema({
 
  date: {
    type: Date,
    require: true
  },
  step: {
    type: String,
    require: true
  },
  // jobId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'job'
  // }

});

const Status = model("state", statusSchema);

module.exports = Status;