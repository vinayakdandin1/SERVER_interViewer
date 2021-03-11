const router = require("express").Router();
let JobModel = require("../models/Job.model")
let StepModel = require("../models/Step.model")
let UserModel = require("../models/User.model")
const uploader = require("../middlewares/cloudinary.config");
const { response } = require("express");


//To check User is Logged in -------------------------------------------------------------------->
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

// Get route of Home page where welcome user and upcoming interviews will be displayed ---------->

router.get("/user", isLoggedIn, (req, res, next) => {
  let user = req.sessions.user;
  res.status(200).json(user);
});

router.get("/home", isLoggedIn, (req, res, next) => {
  let user = req.session.user._id;

  UserModel.findOne(user).populate("jobId");
  then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(500).json({
      error: "something went wrong",
      message: err,
    });
  });
});

// Get route to show dashboard of the user with job list on left and form on right -------------->
router.get("/dashboard", isLoggedIn, (req, res, next) => {
  let user = req.session.user._id;
  JobModel.find({ userId: user })
    .then((jobList) => {
      res.status(200).json(jobList);
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err,
      });
    });
});
// GET route to show a preview from the job offers from the dashboard---------------------------->

router.get("/dashboard/:jobId", isLoggedIn, (req, res, next) => {
  let jobId = req.params.jobId;
  JobModel.findById(jobId)
    .then((singleJob) => {
      res.status(200).json(singleJob);
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err,
      });
    });
});

//Post route to create a new Job listing to show on the left component of the dashboard page ---------->

router.post("/create", (req, res, next) => {
  let result = req.session.user;
  const {
    jobTitle,
    companyName,
    applicationDate,
    contactPerson,
    contactDetail,
    jobDescription,
    companyRating,
    applicationLink,
    sourceOfApplication,
    resume,
    salary,
    interviewDate,
    jobLocation,
  } = req.body;

  let newJobPost = {
    jobTitle,
    companyName,
    applicationDate,
    contactPerson,
    contactDetail,
    jobDescription,
    companyRating,
    applicationLink,
    sourceOfApplication,
    resume,
    salary,
    interviewDate,
    jobLocation,
    userId: result._id,
  };

  JobModel.create(newJobPost)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// get & post routes to creat steps inside of Job details page ----------------------------------->

// router.get("/home/:jobId/:steps", (req, res) => {
//   StepModel.find()
//     .then((steps) => {
//       res.status(200).json
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: 'Something went wrong with steps',
//         message: err
//       })
//     })
// })

router.get("/home/steps", (req, res) => {
  StepModel.find()
    .then((steps) => {
      res.status(200).json(steps);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong with steps",
        message: err,
      });
    });
});

router.post("/home/create-steps", (req, res) => {
  const { date, description, jobId } = req.body;

  StepModel.create({ date, description, jobId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong with create step",
        message: err,
      });
    });
});

router.delete('/home/:stepsId', (req, res) => {
  StepModel.findByIdAndDelete(req.params.stepsId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Delete path for deleting a job listing from user's listing ----------------------------------------------------->
router.delete("/home/job/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId;

  JobModel.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.delete("/home/steps/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId;

  StepModel.deleteMany({ jobId: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

//get route to display individual job dynamically which contains all the details and the status component ------------->
router.get("/home/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId;

  JobModel.findById(id)
    .populate("jobId")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Edit Job details in the job detail page ------------------------------------------------------------------------->
router.patch("/home/:jobId", isLoggedIn, (req, res, next) => {
  let id = req.params.jobId;
  const {
      jobTitle,
      companyName,
      applicationDate,
      contactPerson,
      contactDetail,
      jobDescription,
      companyRating,
      applicationLink,
      sourceOfApplication,
      salary,
      interviewDate,
      jobLocation,
    } = req.body;
  JobModel.findByIdAndUpdate(id, {jobTitle,companyName, applicationDate, contactPerson,contactDetail, 
        jobDescription, companyRating, applicationLink, sourceOfApplication, salary, interviewDate,  jobLocation}, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Get route to take the user to profile where he can check his detils and a list of user Resumes ------------------>
router.get("/profile", isLoggedIn, (req, res, next) => {
  let user = req.session.user._id;

  UserModel.findOne(user);
  then((response) => {
    res.status(200).json(response);
  }).catch(() => {
    res.status(500).json({
      error: "Something went wrong",
      message: err,
    });
  });
});

// cloudinary resume get & post route

router.post('/profil/resume', uploader.single("imageUrl"), isLoggedIn, (req, res, next) => {

  UserModel.findByIdAndUpdate(req.session.userData._id, {resume: req.file.path})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong with create step",
        message: err
    })
    })
})

module.exports = router;
