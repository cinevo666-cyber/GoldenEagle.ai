
import { useState, useEffect } from 'react';

export const useClock = (formatter: (date: Date) => string) => {
  const [timeString, setTimeString] = useState(formatter(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeString(formatter(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [formatter]);

  return timeString;
};
