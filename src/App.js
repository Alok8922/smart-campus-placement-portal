import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Applications from "./pages/student/Applications";
import Profile from "./pages/student/Profile";

// company pages
import CompanyDashboard from "./pages/company/CompanyDashboard";
import Applicants from "./pages/company/Applicants";

// admin page (NO admin folder)
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />

        {/* Company */}
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        {/* ✅ FIXED ROUTE (MOST IMPORTANT) */}
        <Route
          path="/company/applicants/:jobId"
          element={<Applicants />}
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
