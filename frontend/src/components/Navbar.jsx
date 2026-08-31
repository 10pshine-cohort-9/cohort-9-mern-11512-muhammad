import { useAuth } from "../context/AuthContext";
import { LogOut, Plus } from "lucide-react";

export default function Navbar({ onNewNote }) {
  const { user, logout } = useAuth();

  const displayName = user?.full_name || user?.name || (user?.email ? user.email.split("@")[0] : "User");

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="red-dot"></span>
        <span>Abu's Notes App</span>
      </div>

      <div className="nav-user">
        {onNewNote && (
          <button type="button" onClick={onNewNote} className="btn-add-note">
            <Plus size={15} />
            <span>NEW NOTE</span>
          </button>
        )}
        <span className="user-tag">{displayName}</span>
        <button type="button" onClick={logout} className="btn-logout">
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
