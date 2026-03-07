import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;