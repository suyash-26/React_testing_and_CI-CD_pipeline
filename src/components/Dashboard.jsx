// Dashboard.jsx

import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  // added comments in main branch
  if (!isAuthenticated) return <p>Please login</p>;

  return <p>Welcome {user.name}</p>;
}