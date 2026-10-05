import Icon from "./Icon";

export function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 mx-auto rounded-full surface2 border border-c flex items-center justify-center mb-4">
        <Icon name="search" className="w-7 h-7 text-muted" />
      </div>
      <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
      {subtitle && (
        <p className="text-muted text-sm max-w-sm mx-auto mb-5">{subtitle}</p>
      )}
      {actionLabel && (
        <button
          onClick={onAction}
          className="tap px-5 py-2.5 rounded-md font-semibold text-sm"
          style={{ background: "var(--navy)", color: "#fff" }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function FieldError({ msg }) {
  if (!msg) return null;

  return (
    <p
      className="text-xs mt-1"
      style={{ color: "var(--danger)" }}
      role="alert"
    >
      {msg}
    </p>
  );
}

export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5">
      {children}
    </label>
  );
}

export const inputCls =
  "w-full tap px-3 py-2.5 rounded-md border border-c focus-ring outline-none text-sm bg-white";

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 mt-8"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="tap w-11 h-11 rounded-md border border-c disabled:opacity-40 flex items-center justify-center"
      >
        <Icon name="chevron" className="w-4 h-4 rotate-180" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className="tap w-11 h-11 rounded-md border border-c text-sm font-semibold"
          style={
            p === page
              ? {
                  background: "var(--navy)",
                  color: "#fff",
                  borderColor: "var(--navy)",
                }
              : {}
          }
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="tap w-11 h-11 rounded-md border border-c disabled:opacity-40 flex items-center justify-center"
      >
        <Icon name="chevron" className="w-4 h-4" />
      </button>
    </div>
  );
}