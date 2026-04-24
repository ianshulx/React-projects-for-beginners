import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import Saved from "../Pages/Saved";
import MyReview from "../Pages/MyReview";
import Error404 from "../Pages/Error404";
import Profile from "../Pages/Profile";
import { isAuthenticated } from "../utils/auth";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

// Public Route wrapper (redirect to home if already signed in)
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route - SignIn page */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:genre" element={<Home />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/myreview" element={<MyReview />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
