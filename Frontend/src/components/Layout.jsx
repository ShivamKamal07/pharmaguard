import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

  return (

    <div>

      <Sidebar />

      <Navbar />

      <div
        style={{
          marginLeft: "var(--sidebar-w)",
          marginTop: "var(--navbar-h)",
          minHeight: "calc(100vh - var(--navbar-h))",
        }}
      >
        <div className="pg-fade-in">
          {children}
        </div>
      </div>

    </div>

  );

};

export default Layout;
