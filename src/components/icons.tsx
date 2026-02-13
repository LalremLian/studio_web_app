import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#673AB7" />
    <path
      d="M21.5566 15.0039C22.2222 15.3867 22.2222 16.3212 21.5566 16.704L13.179 21.4921C12.5134 21.8749 11.6789 21.3932 11.6789 20.6214L11.6789 11.0865C11.6789 10.3147 12.5134 9.83304 13.179 10.2158L21.5566 15.0039Z"
      fill="white"
    />
  </svg>
);
