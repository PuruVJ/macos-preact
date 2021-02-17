import { format } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'use-interval';

const MenuBarTime = () => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), 2000);

  return (
    <>
      {format(time, 'EEE MMM dd')}&nbsp; {format(time, 'h:mm aa')}
    </>
  );
};

export { MenuBarTime };
