import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = () => {
    alert("Profile updated (backend connect later)");
  };

  return (
    <div>
      <h2>Profile Page</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}