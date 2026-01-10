const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER  ✅ FIXED
// ===============================
const register = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "company" && !companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ IMPORTANT: PASS PLAIN PASSWORD
    const user = await User.create({
      name,
      email,
      password, // 🔥 DO NOT HASH HERE
      role,
      companyName: role === "company" ? companyName : undefined,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        companyName: user.companyName || null,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// LOGIN ✅ FIXED & SAFE
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST EMAIL:", email);
    console.log("LOGIN REQUEST PASSWORD (PLAIN):", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("HASHED PASSWORD FROM DB:", user.password);

    // ✅ USE MODEL METHOD
    const isMatch = await user.matchPassword(password);
    console.log("PASSWORD MATCH RESULT:", isMatch);

    if (!isMatch) {
      console.log("❌ PASSWORD DOES NOT MATCH");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ LOGIN SUCCESS");

    res.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        companyName: user.companyName || null,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
