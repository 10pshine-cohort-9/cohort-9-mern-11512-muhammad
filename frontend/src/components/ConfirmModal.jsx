import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
    >
      <div
        className="confirm-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="confirm-modal-header">
          <div className="confirm-title-row">
            <AlertTriangle size={18} className="confirm-icon" />
            <h2 id="confirm-modal-title">{title || "CONFIRM ACTION"}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-close"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="confirm-modal-body">
          <p>{message || "Are you sure you want to proceed?"}</p>
        </div>

        <div className="confirm-modal-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger">
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}
