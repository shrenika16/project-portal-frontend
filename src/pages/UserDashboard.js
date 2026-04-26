export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h3>No user found. Please login again.</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 User Dashboard</h2>

      <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}