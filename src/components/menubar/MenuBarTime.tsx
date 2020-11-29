import { format } from 'date-fns';
import React from 'react';

const MenuBarTime = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 5);

    return () => clearInterval(timer);
  });

  return <>{format(time, 'EEE MMM d  h:mm aa')}</>;
};

export { MenuBarTime };
