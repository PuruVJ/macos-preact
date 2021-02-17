interface IAppIcon extends React.SVGAttributes<SVGSVGElement> {
  path: string;
  size?: number;
}

const AppIcon = ({ size = 24, path, ...props }: IAppIcon) => (
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

export { AppIcon };
