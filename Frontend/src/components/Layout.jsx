import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      
      <Sidebar />

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />
        <div className="p-4" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;