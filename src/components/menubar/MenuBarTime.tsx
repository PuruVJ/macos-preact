import { format } from 'date-fns';
import React from 'react';
import { useInterval } from 'use-interval';

const MenuBarTime = () => {
  const [time, setTime] = React.useState(new Date());

  useInterval(() => setTime(new Date()), 2000);

  return <>{format(time, 'EEE MMM dd  h:mm aa')}</>;
};

export { MenuBarTime };
