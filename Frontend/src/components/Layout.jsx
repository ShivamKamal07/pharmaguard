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
          marginLeft: "250px",
          padding: "20px",
          marginTop: "60px"
        }}
      >
        {children}
      </div>

    </div>

  );

};

export default Layout;