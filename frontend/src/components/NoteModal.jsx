import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { X, Save, Edit3 } from "lucide-react";

export default function NoteModal({ isOpen, onClose, onSave, editingNote, isViewOnly, onSwitchToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
    } else {
      setTitle("");
      setContent("");
    }
    setError("");
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      setError("Content is required");
      return;
    }
    onSave({ title, content });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }]
    ]
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isViewOnly ? "View Note" : editingNote ? "Edit Note" : "New Note"}</h2>
          <button onClick={onClose} className="btn-close">
            <X size={18} />
          </button>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {isViewOnly ? (
          <div className="modal-view-body">
            <h1 className="note-view-title">{title}</h1>
            <div
              className="note-view-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Close
              </button>
              <button
                type="button"
                onClick={() => onSwitchToEdit(editingNote)}
                className="btn-primary"
              >
                <Edit3 size={14} />
                <span>Edit Note</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              type="text"
              placeholder="NOTE TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
              autoFocus
            />

            <div className="editor-container">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Write your note here..."
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Save size={14} />
                <span>{editingNote ? "Save Changes" : "Create"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
