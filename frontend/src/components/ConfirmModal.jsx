import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal-dialog-root" aria-labelledby="confirm-modal-title">
      <button
        type="button"
        className="modal-backdrop-btn"
        onClick={onClose}
        aria-label="Close background overlay"
      />
      <div className="confirm-modal-content">
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
    </dialog>
  );
}
