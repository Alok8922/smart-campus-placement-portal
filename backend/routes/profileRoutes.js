const express = require("express");
const router = express.Router();

const {
  updateProfile,
  getProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Student: create/update profile
router.post("/", protect, upload.single("resume"), updateProfile);

// Get profile by ID
router.get("/:id", protect, getProfile);
// PUT /api/profile
router.put("/", protect, updateProfile);

module.exports = router;
