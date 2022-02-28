import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

export const useDay = (option) => {
  const [day, setDay] = useState(dayjs());

  const resetDay = useCallback(() => {
    setDay(dayjs());
    window.requestAnimationFrame(resetDay);
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(resetDay);
  }, [resetDay]);

  return {
    ...day,
    ampm: option.hour24 ? '' : day.format('A'),
    clock: option.hour24 ? day.format('HH:mm') : day.format('hh:mm'),
    second: option.second ? day.format('ss') : '',
    date: option.date ? day.format('YY/MM/DD ddd') : '',
  };
};
