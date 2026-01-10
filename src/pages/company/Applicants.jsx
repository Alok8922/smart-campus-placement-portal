import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import StatusBadge from "../../components/StatusBadge";

function Applicants() {
  const { jobId } = useParams(); // ✅ REQUIRED
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`); // ✅ FIXED
      setApplications(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await API.put(`/applications/${applicationId}/status`, { status }); // ✅ FIXED
      alert(`Student ${status}`);
      fetchApplicants();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Applicants</h2>

        {loading && <p>Loading applicants...</p>}

        {!loading && applications.length === 0 && (
          <p>No applicants yet.</p>
        )}

        {applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h4>{app.student?.name}</h4>

            <p>
              <b>Email:</b> {app.student?.email}
            </p>

            <p>
              <b>Job:</b> {app.job?.title}
            </p>

            <p>
              <b>Status:</b> <StatusBadge status={app.status} />
            </p>

            {app.student?.resume && (
              <p>
                <a
                  href={`http://localhost:5000/${app.student.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              </p>
            )}

            {app.status === "applied" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => updateStatus(app._id, "shortlisted")}
                >
                  Shortlist
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  style={{ marginLeft: "10px" }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Applicants;
