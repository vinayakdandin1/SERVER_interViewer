const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const jobSchema = new Schema({
  
jobTitle: {
  type: String,
  require: true
},
companyName: {
  type:String,
  require: true
},
applicationDate: {
  type: Date,
  require: true
},
contactPerson: String,
contactDetail: String,
jobDescription: String,
companyRating: String,
applicationLink: String,
sourceOfApplication: String,
salary: Number,
interviewDate: Date,
jobLocation: String,
statusId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'state'
  },
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
}

});

const Jobs = model("job", jobSchema);

module.exports = Jobs;