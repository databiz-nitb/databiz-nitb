import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import UsersPage from "./pages/profile/Profile";
import PathwaysPage from "./pages/pathways/PathwayDashboard";
import ResourcesPage from "./pages/resources/ResourceList";
import BlogsPage from "./pages/blogs/BlogsPage";
import EventsPage from "./pages/events/EventPage";
import ProgressPage from "./pages/progress/Progress";
import EventDetails from "./pages/events/EventDetails";
import NotFoundPage from "./pages/NotFoundPage";
import About from "./pages/about/About";
import BlogDetailsPage from "./pages/blogs/BlogDetails";

import CreateBlog from "./pages/blogs/CreateBlog";
import CreateEvent from "./pages/events/CreateEvent";
import Team from "./pages/team/Team";

// Private Route Component
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />

      {/* Protected Routes */}
      <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/pathways" element={<ProtectedRoute><PathwaysPage /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
      <Route path="/blogs" element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
      <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/blogs/:id" element={<ProtectedRoute><BlogDetailsPage /></ProtectedRoute>} />
      <Route path="/create-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
      <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />


      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
