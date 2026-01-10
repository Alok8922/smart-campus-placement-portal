import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    try {
      await API.post("/applications/apply", { jobId });
      alert("Applied successfully");
    } catch (error) {
      alert(
        error.response?.data?.message || "Already applied or error occurred"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Available Jobs</h2>

        {loading && <p>Loading jobs...</p>}

        {!loading && jobs.length === 0 && (
          <p>No jobs available at the moment</p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{job.title}</h3>

            <p>
              <b>Company:</b> {job.companyName}
            </p>

            <p>{job.description}</p>

            {job.minCGPA && (
              <p>
                <b>Minimum CGPA:</b> {job.minCGPA}
              </p>
            )}

            {job.branch && (
              <p>
                <b>Branch:</b> {job.branch}
              </p>
            )}

            <button onClick={() => applyJob(job._id)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentDashboard;
