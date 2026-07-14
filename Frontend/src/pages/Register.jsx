import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await registerUser({name,email,password, role});

      alert("Registration successful");

      navigate("/login");

    } catch(error) {

      alert("Registration failed");

      console.error(error);

    }

  };

  return (

    <div className="pg-auth-shell">

      <div className="pg-auth-side">
        <div className="pg-auth-side-brand">
          <span className="pg-sidebar-brand-mark">PG</span>
          <div>
            <div className="pg-sidebar-brand-name">PharmaGuard</div>
            <div className="pg-sidebar-brand-tag">Risk Intelligence</div>
          </div>
        </div>

        <div className="pg-auth-side-quote">
          Create an account to start analyzing genomic reports and
          tracking drug-gene interaction risk.
        </div>

        <div className="pg-auth-side-foot">CLINICAL RISK INTELLIGENCE SYSTEM</div>
      </div>

      <div className="pg-auth-form-wrap">
        <div className="pg-auth-card pg-fade-in">

          <h2>Create account</h2>
          <p className="pg-subtitle">Get started with PharmaGuard</p>

          <form onSubmit={handleRegister}>

            <div className="pg-field">
              <label className="pg-label">Name</label>
              <input
                className="pg-input"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            <div className="pg-field">
              <label className="pg-label">Email</label>
              <input
                className="pg-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="pg-field">
              <label className="pg-label">Password</label>
              <input
                className="pg-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <div className="pg-field">
              <label className="pg-label">I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pg-select"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <button className="pg-btn pg-btn-primary pg-btn-block" type="submit">
              Create account
            </button>

          </form>

          <p className="pg-subtitle" style={{ marginTop: 20 }}>
            Already have account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>

    </div>

  );

};

export default Register;
