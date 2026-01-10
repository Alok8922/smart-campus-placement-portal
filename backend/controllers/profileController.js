const User = require("../models/User");

/**
 * @desc    Get logged-in user profile
 * @route   GET /api/profile
 * @access  Protected
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update logged-in user profile (Student / Company)
 * @route   PUT /api/profile
 * @access  Protected
 */
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    /* ---------- COMMON FIELDS ---------- */
    if (req.body.name) user.name = req.body.name;

    /* ---------- STUDENT PROFILE ---------- */
    if (user.role === "student") {
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.branch) user.branch = req.body.branch;
      if (req.body.cgpa) user.cgpa = req.body.cgpa;
      if (req.body.skills) user.skills = req.body.skills;

      if (req.file) {
        user.resume = req.file.path;
      }
    }

    /* ---------- COMPANY PROFILE ---------- */
    if (user.role === "company") {
      if (!req.body.companyName && !user.companyName) {
        return res
          .status(400)
          .json({ message: "Company name missing in profile" });
      }

      if (req.body.companyName) {
        user.companyName = req.body.companyName;
      }
    }

    user.isProfileComplete = true;
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
