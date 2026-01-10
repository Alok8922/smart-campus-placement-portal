import { useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

function Profile() {
  const [form, setForm] = useState({
    phone: "",
    branch: "",
    cgpa: "",
    skills: "",
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const submitProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("phone", form.phone);
      formData.append("branch", form.branch);
      formData.append("cgpa", form.cgpa);
      formData.append("skills", form.skills);

      if (resume) {
        formData.append("resume", resume);
      }

      await API.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile & Resume saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "500px" }}>
        <h2>Student Profile</h2>
        <p>Fill your placement details</p>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          step="0.01"
          name="cgpa"
          placeholder="CGPA"
          value={form.cgpa}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px" }}
        />

        {/* 🔥 RESUME UPLOAD */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={inputStyle}
        />

        <button onClick={submitProfile}>Save Profile</button>
      </div>
    </>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
};

export default Profile;
