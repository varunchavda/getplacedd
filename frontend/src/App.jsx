import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/shared/layout"; // ✅ Layout includes Navbar with pt-16

import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import InterviewMaterials from "./components/InterviewMaterials";
import Committee from "./components/committee";
import Faqs from "./components/faqs";
import VadodaraCompanies from "./components/VadodaraCompanies";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';

const appRouter = createBrowserRouter([
  // 🌐 Public / User Routes (with Layout)
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
  {
    path: "/jobs",
    element: (
      <Layout>
        <Jobs />
      </Layout>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <Layout>
        <JobDescription />
      </Layout>
    ),
  },
  {
    path: "/browse",
    element: (
      <Layout>
        <Browse />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/InterviewMaterials",
    element: (
      <Layout>
        <InterviewMaterials />
      </Layout>
    ),
  },
  {
    path: "/committee",
    element: (
      <Layout>
        <Committee />
      </Layout>
    ),
  },
  {
    path: "/faqs",
    element: (
      <Layout>
        <Faqs />
      </Layout>
    ),
  },
  {
    path: "/vadodara-companies",
    element: (
      <Layout>
        <VadodaraCompanies />
      </Layout>
    ),
  },

  // 🔐 Admin Routes (no Layout)
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
