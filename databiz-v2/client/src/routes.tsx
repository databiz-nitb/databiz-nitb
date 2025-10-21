import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import UsersPage from "./pages/users/UserProfile";
import PathwaysPage from "./pages/pathways/PathwayList";
import PathwayDetailsPage from "./pages/pathways/PathwayDetails";
import BlogsPage from "./pages/blogs/BlogList";
import BlogDetailsPage from "./pages/blogs/BlogDetails";
import EventsPage from "./pages/events/EventList";
import EventDetailsPage from "./pages/events/EventDetails";
import ProgressPage from "./pages/progress/Progress";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePathway from "./pages/admin/CreatePathway";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import CreateEvent from "./pages/admin/CreateEvent";
import EditEvent from "./pages/admin/EditEvent";
import NotFoundPage from "./pages/NotFoundPage";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Public Routes - Accessible to all users (including non-authenticated) */}
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogDetailsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      
      {/* Junior & Admin Routes - Require junior or admin role */}
      <Route path="/pathways" element={
        <ProtectedRoute roles={["junior", "admin"]}>
          <PathwaysPage />
        </ProtectedRoute>
      } />
      <Route path="/pathways/:id" element={
        <ProtectedRoute roles={["junior", "admin"]}>
          <PathwayDetailsPage />
        </ProtectedRoute>
      } />
      
      {/* Admin Only Routes */}
      <Route path="/admin" element={
        <ProtectedRoute roles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/pathways/create" element={
        <ProtectedRoute roles={["admin"]}>
          <CreatePathway />
        </ProtectedRoute>
      } />
      <Route path="/admin/blogs/create" element={
        <ProtectedRoute roles={["admin"]}>
          <CreateBlog />
        </ProtectedRoute>
      } />
      <Route path="/admin/blogs/edit/:id" element={
        <ProtectedRoute roles={["admin"]}>
          <EditBlog />
        </ProtectedRoute>
      } />
      <Route path="/admin/events/create" element={
        <ProtectedRoute roles={["admin"]}>
          <CreateEvent />
        </ProtectedRoute>
      } />
      <Route path="/admin/events/edit/:id" element={
        <ProtectedRoute roles={["admin"]}>
          <EditEvent />
        </ProtectedRoute>
      } />
      
      {/* Authenticated User Routes */}
      <Route path="/users" element={
        <ProtectedRoute>
          <UsersPage />
        </ProtectedRoute>
      } />
      <Route path="/progress" element={
        <ProtectedRoute>
          <ProgressPage />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
