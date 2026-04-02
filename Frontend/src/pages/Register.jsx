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

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button style={styles.button} type="submit">
            Register
          </button>

        </form>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  );

};

const styles = {
  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f5f6fa"
  },

  card:{
    width:"350px",
    padding:"30px",
    background:"#fff",
    borderRadius:"10px",
    boxShadow:"0 5px 20px rgba(0,0,0,0.1)"
  },

  input:{
    width:"100%",
    padding:"10px",
    margin:"10px 0",
    borderRadius:"6px",
    border:"1px solid #ccc"
  },

  button:{
    width:"100%",
    padding:"10px",
    background:"#2196F3",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }
};

export default Register;