import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="red-dot"></span>
        <span>Abu's Notes App</span>
      </div>

      <div className="nav-user">
        <span className="user-tag">{user?.email || "User"}</span>
        <button onClick={logout} className="btn-logout">
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
