import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const statsRes = await axios.get("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(userRes.data);
        setStats(statsRes.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setUsers(users.filter(u => u._id !== id));
  };

  const editUser = async (user) => {
    const name = prompt("Name", user.name);
    const email = prompt("Email", user.email);
    const role = prompt("Role", user.role);

    if (!name || !email || !role) return;

    const res = await axios.put(
      `http://localhost:5000/api/users/${user._id}`,
      { name, email, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // safer update
    const updated = res.data || { ...user, name, email, role };

    setUsers(users.map(u => u._id === user._id ? updated : u));
  };

  if (loading) {
    return <h3>Loading Admin Dashboard...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 Admin Dashboard</h2>

      {/* STATS */}
      <div>
        <h4>Total Users: {stats.totalUsers || 0}</h4>
        <h4>Admins: {stats.admins || 0}</h4>
        <h4>Clients: {stats.clients || 0}</h4>
        <h4>Users: {stats.users || 0}</h4>
      </div>

      <hr />

      {/* USERS */}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(u => (
          <div key={u._id} style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
            <p>{u.name} - {u.email} - {u.role}</p>

            <button onClick={() => editUser(u)}>Edit</button>
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}