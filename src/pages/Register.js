import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleRegister = async () => {
    // 🔴 STRICT validation
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    console.log({ name, email, password, role }); // debug

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
          role
        }
      );

      console.log(res.data);

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Register failed ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <br />

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />

      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />

      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="user">User</option>
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select>

      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}