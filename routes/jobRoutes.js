const router = require("express").Router();
let JobModel = require("../models/Job.model")
let StepModel = require("../models/Step.model")
let UserModel = require("../models/User.model")

//To check User is Logged in -------------------------------------------------------------------->
const isLoggedIn = (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};

// Get route of Home page where welcome user and upcoming interviews will be displayed ---------->

router.get("/home", isLoggedIn, (req, res, next) => {
  
  let user = req.session.loggedInUser._id

  UserModel.findOne(user)
    .populate("jobId")
    then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err
      })
    })
})


// Get route to show dashboard of the user with job list on left and form on right -------------->
router.get("/dashboard", isLoggedIn, (req, res, next) => {
  
  let user = req.session.loggedInUser._id
  UserModel.find(user)
    .populate("jobId")
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

//Post route to create a new Job listing to show on the left component of the dashboard page ---------->

router.post("/create", isLoggedIn, (req, res, next) => {

  const {newJobPost:  {jobTitle, companyName, applicationDate, contactPerson, contactDetail, jobDescription, companyRating,
     applicationLink, sourceOfApplication, resume, salary, interviewDate,jobLocation } } = req.body

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

//Post route to post comments on the step inside of Job details page ----------------------------------->

router.get("/steps", isLoggedIn, (req, res) => {
  StepModel.find()
    .then((steps) => {
      res.status(200).json
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong with steps',
        message: err
      })
    })
})

router.post("/create-step", isLoggedIn, (req, res) => {
  const {date, step} = req.body

  StepModel.create({date, step})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong with create step",
        message: err
    })
    })

})

//get route to display individual job dynamically which contains all the details and the status component ------------->
router.get("/home/:jobId", isLoggedIn, (req, res, next) => {
  
  let id = req.params.jobId
  
  JobModel.findOne(id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err
    })
    })
})

// Edit Job details in the job detail page ------------------------------------------------------------------------->
router.patch("/home/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId
  const {newJobPost:  {jobTitle, companyName, applicationDate, contactPerson, contactDetail, jobDescription, companyRating,
    applicationLink, sourceOfApplication, resume, salary, interviewDate,jobLocation } } = req.body

  JobModel.findByIdAndUpdate(id, newJobPost, {new: true})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong",
        message: err
    })
    })
})

// Delete path for deleting a job listing from user's listing ----------------------------------------------------->
router.delete("home/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId

  JobModel.findByIdAndDelete(id)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch(() => {
    res.status(500).json({
      error: "Something went wrong",
      message: err
  })
  })
})

// Delete path for deleting a step ------------------------------------------------------------------------------->

router.delete("home/:stepId", isLoggedIn, (req, res, next) => {
  let id = req.params.stepId

  StepModel.findByIdAndDelete(id)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch(() => {
    res.status(500).json({
      error: "Something went wrong",
      message: err
  })
  })
})

// Get route to take the user to profile where he can check his detils and a list of user Resumes ------------------>
router.get("/profile", isLoggedIn,  (req, res, next) => {

  let user = req.session.loggedInUser._id

  UserModel.findOne(user)
    then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err
      })
    })
})



module.exports = router;