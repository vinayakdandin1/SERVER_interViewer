const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
}
});

const Jobs = model("job", jobSchema);

module.exports = Jobs;