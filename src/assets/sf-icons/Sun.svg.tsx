import { mdiWhiteBalanceSunny } from '@mdi/js';
import { FC, SVGAttributes } from 'react';
import { AppIcon } from '__/components/utils/AppIcon';

export const SunSVG: FC<SVGAttributes<SVGSVGElement> & { size: number }> = ({
  size = 24,
  ...props
}) => <AppIcon size={size} path={mdiWhiteBalanceSunny} {...props} />;
