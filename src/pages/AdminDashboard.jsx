import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/admin");
      setJobs(res.data);
    } catch (error) {
      console.error("Fetch jobs error:", error);
    }
  };

  const updateStatus = async (jobId, status) => {
    try {
      await API.put(`/jobs/${jobId}/status`, { status });
      fetchJobs(); // 🔥 refresh after update
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update job status");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>
        <p>Approve or reject company job postings</p>

        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => (
          <div key={job._id} style={cardStyle}>
            <h3>{job.title}</h3>
            <p><b>Company:</b> {job.companyName}</p>
            <p>{job.description}</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    job.status === "approved"
                      ? "green"
                      : job.status === "rejected"
                      ? "red"
                      : "orange",
                }}
              >
                {job.status}
              </span>
            </p>

            {job.status === "pending" && (
              <>
                <button
                  onClick={() => updateStatus(job._id, "approved")}
                  style={approveBtn}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(job._id, "rejected")}
                  style={rejectBtn}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const approveBtn = {
  background: "#16a34a",
  color: "white",
  padding: "6px 12px",
  marginRight: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#dc2626",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminDashboard;
