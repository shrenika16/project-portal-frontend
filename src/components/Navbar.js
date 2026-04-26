import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };

  return (
    <div style={{
      padding: "10px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3>Project Portal</h3>

      <button onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}