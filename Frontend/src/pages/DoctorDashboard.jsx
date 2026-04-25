import { getUser } from "../utils/auth";

const DoctorDashboard = () => {
  const user = getUser();

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍⚕️ Doctor Dashboard</h2>

      <h4>Welcome, Dr. {user?.name}</h4>

      <div style={{ marginTop: "20px" }}>
        <p>📊 Total Patients: --</p>
        <p>🚨 High Risk Cases: --</p>
        <p>💬 Active Chats: --</p>
      </div>
    </div>
  );
};

export default DoctorDashboard;