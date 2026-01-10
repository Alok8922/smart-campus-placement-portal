import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import StatusBadge from "../../components/StatusBadge";

function CompanyDashboard() {
  // Job post form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);

  // Job list
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Fetch company jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/company");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load company jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  // Post new job
  const postJob = async () => {
    if (!title || !description) {
      alert("Job title and description are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/jobs", {
        title,
        description,
        minCGPA,
        branch,
      });

      alert("Job posted successfully. Waiting for admin approval.");

      // reset form
      setTitle("");
      setDescription("");
      setMinCGPA("");
      setBranch("");

      fetchJobs(); // refresh job list
    } catch (error) {
      console.error(error);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "900px" }}>
        <h2>Company Dashboard</h2>

        {/* POST JOB */}
        <div style={card}>
          <h3>Post a New Job</h3>

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
          />

          <input
            type="number"
            placeholder="Minimum CGPA (optional)"
            value={minCGPA}
            onChange={(e) => setMinCGPA(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Eligible Branch (optional)"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            style={inputStyle}
          />

          <button onClick={postJob} disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>

        {/* JOB LIST */}
        <h3 style={{ marginTop: "30px" }}>Your Posted Jobs</h3>

        {loadingJobs && <p>Loading jobs...</p>}

        {!loadingJobs && jobs.length === 0 && (
          <p>No jobs posted yet.</p>
        )}

        {jobs.map((job) => (
          <div key={job._id} style={card}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>

            <p>
              <b>Status:</b> <StatusBadge status={job.status} />
            </p>

            {/* ✅ MOST IMPORTANT BUTTON */}
            <Link to={`/company/applicants/${job._id}`}>
              <button>View Applicants</button>
            </Link>
          </div>
        ))}
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

const card = {
  background: "#fff",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "16px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

export default CompanyDashboard;
