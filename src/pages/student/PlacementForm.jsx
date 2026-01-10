import { useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

function PlacementForm() {
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("branch", branch);
    formData.append("cgpa", cgpa);
    formData.append("skills", skills);
    if (resume) formData.append("resume", resume);

    await API.put("/profile/placement-form", formData);
    alert("Placement form submitted");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Placement Registration Form</h2>

        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} /><br /><br />
        <input placeholder="Branch" onChange={(e) => setBranch(e.target.value)} /><br /><br />
        <input placeholder="CGPA" onChange={(e) => setCgpa(e.target.value)} /><br /><br />
        <textarea placeholder="Skills" onChange={(e) => setSkills(e.target.value)} /><br /><br />
        <input type="file" onChange={(e) => setResume(e.target.files[0])} /><br /><br />

        <button onClick={submitForm}>Submit Placement Form</button>
      </div>
    </>
  );
}

export default PlacementForm;
