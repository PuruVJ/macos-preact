import { format } from 'date-fns';
import { useState } from 'preact/hooks';
import { useInterval } from '__/hooks';

export const TopBarTime = () => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), 2000);

  return <div style={{ margin: '0 0.5rem' }}>{format(time, 'EEE MMM dd  h:mm aa')}</div>;
};
