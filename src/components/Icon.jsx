export default function Icon({ name, className = "w-5 h-5", style }) {
  const paths = {
    heart: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-9.5-8.5C.8 8 2 4.5 5.5 4c2-.3 3.6.7 4.5 2 .9-1.3 2.5-2.3 4.5-2 3.5.5 4.7 4 3 7.5C19 15.65 12 20 12 20z"
      />
    ),
    heartFill: (
      <path
        fill="currentColor"
        d="M12 20s-7-4.35-9.5-8.5C.8 8 2 4.5 5.5 4c2-.3 3.6.7 4.5 2 .9-1.3 2.5-2.3 4.5-2 3.5.5 4.7 4 3 7.5C19 15.65 12 20 12 20z"
      />
    ),
    scale: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4v16M18 4v16M4 8h4M16 8h4M2 20h8M14 20h8M6 4l-4 8h8l-4-8zM18 4l-4 8h8l-4-8z"
      />
    ),
    menu: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    ),
    close: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l12 12M18 6L6 18"
      />
    ),
    search: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
      />
    ),
    filter: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M7 12h10M10 18h4"
      />
    ),
    check: (
      <path
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    ),
    chevron: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6l6 6-6 6"
      />
    ),
    share: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14"
      />
    ),
    user: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z"
      />
    ),
    pin: (
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  );
}