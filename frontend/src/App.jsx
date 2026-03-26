import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./index.css";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/layout/ScrollToTop";

const AboutPage = lazy(() => import("./pages/inner/AboutPage"));
const ServicesPage = lazy(() => import("./pages/inner/ServicesPage"));
const DestinationsPage = lazy(() => import("./pages/inner/DestinationsPage"));
const ContactPage = lazy(() => import("./pages/inner/ContactPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProtectedRoute = lazy(() => import("./components/layout/ProtectedRoute"));

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#31468e] border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          <Route path="/admin/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;