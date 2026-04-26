import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // ✅ user set
      setUser(res.data.user);

      // ✅ localStorage save
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      // 🔥 IMPORTANT FIX (Bearer token format)
      axios.defaults.headers.common["Authorization"] = 
        `Bearer ${res.data.token}`;

      // ✅ redirect by role
      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "client") {
        navigate("/client");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <Link to="/register" style={{ color: "blue" }}>
        Don't have an account? Register here
      </Link>
    </div>
  );
}