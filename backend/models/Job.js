const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // =====================
    // BASIC JOB DETAILS
    // =====================
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
    },

    companyName: {
      type: String,
    },

    // =====================
    // ELIGIBILITY CRITERIA
    // =====================
    minCGPA: {
      type: Number,
    },

    branch: {
      type: String,
    },

    // =====================
    // META DATA
    // =====================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
