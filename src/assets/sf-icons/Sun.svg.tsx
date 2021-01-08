import { mdiWhiteBalanceSunny } from '@mdi/js';
import React, { FC } from 'react';
import { AppIcon } from '__/components/utils/AppIcon';

export const SunSVG: FC<React.SVGAttributes<SVGSVGElement> & { size: number }> = ({
  size = 24,
  ...props
}) => <AppIcon size={size} path={mdiWhiteBalanceSunny} {...props} />;
