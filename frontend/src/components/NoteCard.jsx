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
    <article className="note-card">
      <button
        type="button"
        className="note-card-body-btn"
        onClick={() => onView(note)}
        aria-label={`View note ${note.title}`}
      >
        <h3 className="note-title">{note.title}</h3>
        <p className="note-preview">{getPlainText(note.content)}</p>
        <div className="note-card-footer">
          <span>{formatDate(note.updated_at || note.created_at)}</span>
        </div>
      </button>

      <div className="note-actions">
        <button
          type="button"
          onClick={() => onEdit(note)}
          className="icon-btn edit-btn"
          title="Edit Note"
          aria-label="Edit Note"
        >
          <Edit3 size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="icon-btn delete-btn"
          title="Delete Note"
          aria-label="Delete Note"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
