import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className="confirm-title-row">
            <AlertTriangle size={18} className="confirm-icon" />
            <h2>{title || "CONFIRM ACTION"}</h2>
          </div>
          <button onClick={onClose} className="btn-close">
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
