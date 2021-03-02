const router = require("express").Router();
let JobModel = require("../models/Job.model")
let StautsModel = require("../models/Status.model")

router.get("/home", (req, res, next) => {
  
  JobModel.find()
    .then((jobList) => {
      // console.log("Home works");
      res.status(200).json(jobList)
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err
      })
    })
  
});

router.post("/create", (req, res, next) => {

  const {newJobPost:  {jobTitle, companyName, applicationDate, contactPerson, contactDetail, jobDescription, companyRating,
     applicationLink, sourceOfApplication, resume, salary } } = req.body

  JobModel.create(newJobPost)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(500).json({
      error: "Something went wrong",
      message: err
    })
  })

})

router.post("/create-status", (req, res, next) => {
  const {date, step} = req.body

  StautsModel.create({date, step})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err
    })
    })

})

module.exports = router;