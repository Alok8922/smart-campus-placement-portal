const Job = require("../models/Job");

/**
 * @desc    Company creates a job
 * @route   POST /api/jobs
 * @access  Company
 */
const createJob = async (req, res) => {
  try {
    const { title, description, salary, minCGPA, branch } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // 🔥 companyName ALWAYS from logged-in user
    const companyName = req.user.companyName;

    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name missing in profile" });
    }

    const job = await Job.create({
      title,
      description,
      salary,
      minCGPA,
      branch,

      companyName: companyName,
      createdBy: req.user._id,
      status: "pending", // admin approval needed
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get approved jobs (Students)
 * @route   GET /api/jobs
 * @access  Protected
 */
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get jobs posted by logged-in company
 * @route   GET /api/jobs/company
 * @access  Company
 */
const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (error) {
    console.error("Get Company Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get ALL jobs (Admin only)
 * @route   GET /api/jobs/admin
 * @access  Admin
 */
const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Get Admin Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Approve / Reject job (Admin)
 * @route   PUT /api/jobs/:id/status
 * @access  Admin
 */
const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = status;
    await job.save();

    res.json(job);
  } catch (error) {
    console.error("Update Job Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createJob,
  getJobs,
  getCompanyJobs,
  getAllJobsAdmin,
  updateJobStatus,
};
