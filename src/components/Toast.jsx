import { useApp } from "../context/VehicleContext";

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const colors = {
    success: { bg: "var(--success-bg)", text: "var(--success)" },
    error: { bg: "var(--danger-bg)", text: "var(--danger)" },
    info: { bg: "var(--surface-2)", text: "var(--text)" },
  }[toast.type] || {
    bg: "var(--surface)",
    text: "var(--text)",
  };

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-sm"
      role="status"
      aria-live="polite"
    >
      <div
        className="rounded-lg border px-4 py-3 shadow-lg text-sm font-medium"
        style={{
          background: colors.bg,
          color: colors.text,
          borderColor: "var(--border)",
        }}
      >
        {toast.message}
      </div>
    </div>
  );
}