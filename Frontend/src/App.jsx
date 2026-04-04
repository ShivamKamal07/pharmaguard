import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Analyze from "./pages/Analyze";
import Patients from "./pages/Patients";
import Chat from "./pages/Chat";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <Analyze />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
