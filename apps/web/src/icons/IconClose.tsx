import { IconProps } from ".";

export const IconClose = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line data-dc-tpl="160" x1="5" y1="5" x2="19" y2="19"></line>
    <line data-dc-tpl="161" x1="19" y1="5" x2="5" y2="19"></line>
  </svg>
);
