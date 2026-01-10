const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// =====================
// CORS CONFIG
// =====================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// =====================
// BODY PARSER
// =====================
app.use(express.json());

// =====================
// ROUTES
// =====================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// =====================
// STATIC FILES (UPLOADS)
// =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================
// TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// =====================
// GLOBAL ERROR HANDLER (🔥 VERY IMPORTANT 🔥)
// =====================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  // Multer specific errors
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  // Custom file filter errors
  if (err.message && err.message.includes("Only")) {
    return res.status(400).json({ message: err.message });
  }

  // Default error
  res.status(500).json({ message: "Server error" });
});

// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
