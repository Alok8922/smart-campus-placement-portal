const express = require("express");
const router = express.Router();

const {
  applyJob,
  getStudentApplications,
  getApplicantsByJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  protect,
  companyOnly,
} = require("../middleware/authMiddleware"); // ✅ FIXED QUOTE

// STUDENT applies to job
// POST /api/applications/apply
router.post("/apply", protect, applyJob);

// STUDENT views own applications
// GET /api/applications/student
router.get("/student", protect, getStudentApplications);

// COMPANY views applicants for a job
// GET /api/applications/job/:jobId
router.get("/job/:jobId", protect, companyOnly, getApplicantsByJob);

// COMPANY updates application status
// PUT /api/applications/:id/status
router.put("/:id/status", protect, companyOnly, updateApplicationStatus);

module.exports = router;
