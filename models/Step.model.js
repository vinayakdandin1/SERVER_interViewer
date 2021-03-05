const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const stepSchema = new Schema({
 
  date: {
    type: Date,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job'
   }

});

const Steps = model("step", stepSchema);

module.exports = Steps;