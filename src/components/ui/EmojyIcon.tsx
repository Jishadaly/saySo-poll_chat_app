// EmojiIcon Component
export function EmojiIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(180)"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 16h.01" />
        <path d="M8 12s1.5-2 4-2 4 2 4 2" />
        <path d="M15 16h.01" />
      </svg>
    );
  }
  