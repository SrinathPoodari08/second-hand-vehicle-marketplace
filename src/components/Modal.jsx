import { useEffect } from "react";
import Icon from "./Icon";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("keydown", onKey);
    }

    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative surface border-c ml-auto h-full w-full max-w-sm overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-c sticky top-0 surface z-10">
          <h2 className="font-display font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="tap w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/5 focus-ring"
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}