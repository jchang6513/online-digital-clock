import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

export const useClock = (option) => {
  const { hour24, second, timezone, date } = option;
  const [day, setDay] = useState(dayjs());

  const resetDay = useCallback(() => {
    setDay(dayjs());
    window.requestAnimationFrame(resetDay);
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(resetDay);
  }, [resetDay]);

  const clock = day.tz(timezone);
  return {
    ampm: hour24 ? '' : clock.format('A'),
    time: hour24 ? clock.format('HH:mm') : clock.format('hh:mm'),
    second: second ? clock.format('ss') : '',
    date: date ? clock.format('YY/MM/DD ddd') : '',
  };
};
