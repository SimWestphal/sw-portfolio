import { IconProps } from ".";

export const IconAbout = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="9" r="3.2"></circle>
    <path d="M5.5 19a6.5 6.5 0 0 1 13 0"></path>
  </svg>
);
