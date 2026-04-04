import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/doctor/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="mb-4">👥 Patient List</h2>

      <div className="row">
        {patients.map((p) => (
          <div className="col-md-4 mb-3" key={p._id}>
            <div className="card shadow-sm p-3">

              <h5>{p.name}</h5>
              <p className="text-muted">{p.email}</p>

              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/patient/${p._id}`)
                }
              >
                View Details
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;