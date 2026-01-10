const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");


/**
 * @desc    Student applies for a job
 * @route   POST /api/applications
 * @access  Student
 */
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // prevent duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: req.user._id,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      student: req.user._id,
      status: "applied",
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * @desc    Get applications of logged-in student
 * @route   GET /api/applications/student
 * @access  Student
 */
// @desc    Get applications of logged-in student
// @route   GET /api/applications/student
// @access  Student
const getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user._id,
    })
      .populate("job", "title companyName description")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



/**
 * @desc    Get applicants for a job (Company)
 * @route   GET /api/applications/job/:jobId
 * @access  Company
 */
// @desc    Company gets applicants for a job
// @route   GET /api/applications/job/:jobId
// @access  Company
const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("student", "name email resume")
      .populate("job", "title")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};



/**
 * @desc    Update application status (Company)
 * @route   PUT /api/applications/:id/status
 * @access  Company
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["applied", "shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id)
      .populate("student", "name email")
      .populate("job", "title companyName");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    // ✅ SEND EMAIL WHEN SHORTLISTED
    if (status === "shortlisted") {
      await sendEmail(
        application.student.email,
        "Interview Shortlisted – Placement Portal",
        `
          <h2>Congratulations ${application.student.name} 🎉</h2>
          <p>You have been <b>shortlisted</b> for the interview.</p>
          <p><b>Company:</b> ${application.job.companyName}</p>
          <p><b>Job Role:</b> ${application.job.title}</p>
          <p>Please be ready for interview communication.</p>
          <br/>
          <p>Best Regards,<br/>Placement Portal Team</p>
        `
      );
    }

    res.json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error("Update Application Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  applyJob,
  getStudentApplications,
  getApplicantsByJob,
  updateApplicationStatus,
};

