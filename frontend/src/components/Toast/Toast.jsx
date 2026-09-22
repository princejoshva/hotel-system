import React, { useEffect } from "react";
import "./Toast.css";

function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000
}) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
