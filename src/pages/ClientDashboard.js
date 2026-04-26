import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProjects(res.data || []);
      } catch (err) {
        console.log("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

  }, [token]);

  if (loading) {
    return <h3>Loading projects...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧑‍💼 Client Dashboard</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map(p => (
          <div key={p._id || Math.random()} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>
          </div>
        ))
      )}
    </div>
  );
}