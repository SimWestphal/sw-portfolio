export const IconProjects = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="4" y="4" width="7" height="7" rx="1"></rect>
    <rect x="13" y="4" width="7" height="7" rx="1"></rect>
    <rect x="4" y="13" width="7" height="7" rx="1"></rect>
    <rect x="13" y="13" width="7" height="7" rx="1"></rect>
  </svg>
);
