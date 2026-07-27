import { IconProps } from ".";

export const IconSkills = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 3 21 12 12 21 3 12"></polygon>
  </svg>
);
