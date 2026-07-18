import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Home from "./pages/Home";

// 🔐 Protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// 🧠 Role-based routing
const RoleBasedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <AdminDashboard />;
  } else if (user?.role === "worker") {
    return <WorkerDashboard />;
  } else {
    return <Dashboard />; // citizen
  }
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute />
            </PrivateRoute>
          }
        />

        {/* Create Complaint (only citizen ideally, but keep open for now) */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateComplaint />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}