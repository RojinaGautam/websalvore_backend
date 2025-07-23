import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import MenuPage from "./pages/MenuPage";
import VisitusPage from "./pages/VisitusPage";
import AdminDashboard from "../Admin/AdminDashboard";
import TestimonialPage from "./pages/TestimonialPage";
import AddtocartPagePage from "./pages/AddtocartPage";
import Reservation from "./pages/Reservation";
import { AuthContext } from "./components/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public/User routes wrapped in Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/visit-us" element={<VisitusPage />} />
              <Route path="/testimonial" element={<TestimonialPage />} />
              <Route path="/addtocart" element={<AddtocartPagePage />} />
              <Route path="/reservation" element={<Reservation />} />
              {/* Add more public routes here as needed */}
            </Routes>
          </Layout>
        }
      />
      {/* Admin route NOT wrapped in Layout, protected */}
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
    </Routes>
  );
}

export default App;
