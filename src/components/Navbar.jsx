import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#1f2937",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* LOGO / TITLE */}
      <h2 style={{ margin: 0 }}>Placement Portal</h2>

      {/* MENU */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* STUDENT MENU */}
        {role === "student" && (
          <>
            <Link to="/student" style={linkStyle}>Jobs</Link>
            <Link to="/applications" style={linkStyle}>My Applications</Link>
            <Link to="/profile" style={linkStyle}>Profile</Link>
          </>
        )}

        {/* COMPANY MENU */}
        {role === "company" && (
          <>
            <Link to="/company" style={linkStyle}>Post Job</Link>
            <Link to="/applicants" style={linkStyle}>Applicants</Link>
          </>
        )}

        {/* ADMIN MENU */}
        {role === "admin" && (
          <Link to="/admin" style={linkStyle}>Admin Dashboard</Link>
        )}

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
