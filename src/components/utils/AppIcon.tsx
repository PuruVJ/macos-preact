import { SVGAttributes } from 'react';

interface IAppIcon extends SVGAttributes<SVGSVGElement> {
  path: string;
  size?: number;
}

export const AppIcon = ({ size = 24, path, ...props }: IAppIcon) => (
  // @ts-ignore
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
  >
    <path d={path} />
  </svg>
);
