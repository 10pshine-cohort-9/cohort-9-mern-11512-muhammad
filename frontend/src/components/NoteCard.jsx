import { Edit3, Trash2 } from "lucide-react";

export default function NoteCard({ note, onView, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  };

  const getPlainText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="note-card" onClick={() => onView(note)}>
      <div>
        <div className="note-card-header">
          <h3 className="note-title">{note.title}</h3>
          <div className="note-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="icon-btn edit-btn"
              title="Edit Note"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="icon-btn delete-btn"
              title="Delete Note"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        <div className="note-preview">
          {getPlainText(note.content)}
        </div>
      </div>

      <div className="note-card-footer">
        <span>{formatDate(note.updated_at || note.created_at)}</span>
        <span>ID: {note.id ? note.id.substring(0, 8) : ""}</span>
      </div>
    </div>
  );
}
