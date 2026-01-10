const express = require("express");
const router = express.Router();

// controllers
const {
  createJob,
  getJobs,
  getCompanyJobs,
  getAllJobsAdmin,
  updateJobStatus,
} = require("../controllers/jobController");

// auth middleware
const {
  protect,
  adminOnly,
  companyOnly,
} = require("../middleware/authMiddleware");

// ========================================
// JOB ROUTES
// ========================================

// Company → Create job
// POST /api/jobs
router.post("/", protect, companyOnly, createJob);

// Student → View approved jobs
// GET /api/jobs
router.get("/", protect, getJobs);

// Company → View own jobs
// GET /api/jobs/company
router.get("/company", protect, companyOnly, getCompanyJobs);

// Admin → View ALL jobs (pending / approved / rejected)
// GET /api/jobs/admin
router.get("/admin", protect, adminOnly, getAllJobsAdmin);

// Admin → Approve / Reject job
// PUT /api/jobs/:id/status
router.put("/:id/status", protect, adminOnly, updateJobStatus);

module.exports = router;
