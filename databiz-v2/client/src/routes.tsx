import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import UsersPage from "./pages/users/UserProfile";
import PathwaysPage from "./pages/pathways/PathwayList";
import ResourcesPage from "./pages/resources/ResourceList";
import BlogsPage from "./pages/blogs/BlogList";
import EventsPage from "./pages/events/EventList";
import ProgressPage from "./pages/progress/Progress";
import NotFoundPage from "./pages/NotFoundPage";

// Private Route Component
// import PrivateRoute from "./components/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      {/* <Route element={<Protec />}> */}
      <Route path="/users" element={<UsersPage />} />
      <Route path="/pathways" element={<PathwaysPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      {/* </Route> */}

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
