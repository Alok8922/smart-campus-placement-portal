import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

function Applications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/student");
      setApplications(res.data);
    } catch (error) {
      console.error("Fetch applications error:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    if (status === "shortlisted") return "🟢 Shortlisted";
    if (status === "rejected") return "🔴 Rejected";
    return "🟡 Applied";
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>My Applications</h2>

        {applications.length === 0 && <p>No applications yet</p>}

        {applications.map((app) => (
          <div key={app._id} style={cardStyle}>
            <h3>{app.job?.title}</h3>
            <p><b>Company:</b> {app.job?.companyName}</p>
            <p>{app.job?.description}</p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ fontWeight: "bold" }}>
                {getStatusBadge(app.status)}
              </span>
            </p>
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

export default Applications;
