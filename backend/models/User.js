const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // =====================
    // BASIC AUTH FIELDS
    // =====================
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "company", "admin"],
      required: true,
    },
    // 🔥 COMPANY NAME (ONLY FOR COMPANY ROLE)
    companyName: {
      type: String,
    },

    // =====================
    // PLACEMENT FORM FIELDS (STUDENT)
    // =====================
    phone: {
      type: String,
    },

    branch: {
      type: String,
    },

    cgpa: {
      type: Number,
    },

    skills: {
      type: String,
    },

    resume: {
      type: String, // file path (uploads/filename.pdf)
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    // =====================
    // ADMIN VERIFICATION (OPTIONAL)
    // =====================
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// =====================
// PASSWORD HASHING
// =====================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// =====================
// PASSWORD MATCH METHOD
// =====================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

