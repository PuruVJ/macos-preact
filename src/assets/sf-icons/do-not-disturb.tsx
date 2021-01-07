import React from 'react';

export const DoNotDisturbSVG = ({
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & { size: number }) => (
  <svg
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    {...props}
  >
    <path d="M525.3 989.5C241.2 989.5 10 758.3 10 474.1c0-196.8 109.6-373.6 285.9-461.4 7.9-3.9 17.5-2.4 23.7 3.8 6.2 6.2 7.9 15.8 4 23.7-32.2 65.4-48.5 135.7-48.5 208.9 0 261.4 212.7 474.1 474.1 474.1 74 0 145-16.7 211-49.5 7.9-3.9 17.5-2.4 23.7 3.8 6.3 6.3 7.9 15.8 3.9 23.7C900.5 879 723.3 989.5 525.3 989.5z" />
  </svg>
);
