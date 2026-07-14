import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Analyze from "./pages/Analyze";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Chat from "./pages/Chat";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC PAGES - no sidebar/navbar chrome */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED PAGES - wrapped in Layout (sidebar + navbar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DoctorDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <Layout>
                <Analyze />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Layout>
                <Chat />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Layout>
                <Patients />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PatientDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
