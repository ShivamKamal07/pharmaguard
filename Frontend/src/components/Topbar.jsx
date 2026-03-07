import React from "react";

const Topbar = () => {
  return (
    <div
      className="bg-white shadow-sm px-4 py-3 d-flex justify-content-between align-items-center"
      style={{ marginLeft: "250px" }}
    >
      <h5 className="mb-0">Clinical Risk Intelligence System</h5>

      <div>
        <span className="me-3">Welcome, Shivam</span>
        <button className="btn btn-outline-primary btn-sm">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;