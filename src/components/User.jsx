// Testin Async UI + Loading State



// User.jsx
import { useEffect, useState } from "react";

export default function User() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({ name: "Suyash" });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Loading...</p>;

  return <p>User: {user.name}</p>;
}