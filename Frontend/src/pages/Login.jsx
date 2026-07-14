import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      // const { token, user } = res;
      const token = res.token;
      const user = res.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
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
          Pharmacogenomic risk analysis, drug-gene interaction insight,
          and clinical reporting in one workspace.
        </div>

        <div className="pg-auth-side-foot">CLINICAL RISK INTELLIGENCE SYSTEM</div>
      </div>

      <div className="pg-auth-form-wrap">
        <div className="pg-auth-card pg-fade-in">
          <h2>Welcome back</h2>
          <p className="pg-subtitle">Sign in to continue to your dashboard</p>

          <form onSubmit={handleLogin}>
            <div className="pg-field">
              <label className="pg-label">Email</label>
              <input
                className="pg-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="pg-btn pg-btn-primary pg-btn-block" type="submit">
              Sign in
            </button>
          </form>

          <p className="pg-subtitle" style={{ marginTop: 20 }}>
            Don't have account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
