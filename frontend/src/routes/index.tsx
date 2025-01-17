// src/routes/index.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Auth Components
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

// Layouts
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Pages
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Classroom from "../pages/Classroom";
import AddClass from "../pages/AddClass";
import ClassStudents from "../pages/ClassStudents";
import Summary from "../pages/Summary";
import Contact from "../pages/Contact";
import Promotion from "../pages/Promotion";
import ChangePassword from "../pages/ChangePassword";
import IndividualReport from "../pages/IndividualReport";
import ScoringPage from "../pages/Scoring";
import UserManagement from "../pages/UserManagement";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterForm />
          }
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <ForgotPasswordForm />
            )
          }
        />
      </Route>

      {/* Protected routes with DashboardLayout */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Classroom routes */}
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/class/add" element={<AddClass />} />
        <Route path="/class/:classId/students" element={<ClassStudents />} />
        <Route path="/scoring/:classId" element={<ScoringPage />} />
        
        {/* Report routes */}
        <Route path="/summary" element={<Summary />} />
        <Route path="/individual-report/:studentId" element={<IndividualReport />} />
        
        {/* Admin routes */}
        <Route path="/admin/users" element={<UserManagement />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace state={{ from: location }} />} />
    </Routes>
  );
};

export default AppRoutes;