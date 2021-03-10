const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const referralSchema = new Schema({
  
jobTitle: {
  type: String,
  require: true
},
companyName: {
  type:String,
  require: true
},
contactPerson: String,
contactDetail: String,
jobDescription: String,
applicationLink: String,
jobLocation: String,
jobOwner: Boolean,
referralEmail: String,
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
}
});

const Referrals = model("referral", referralSchema);

module.exports = Referrals;