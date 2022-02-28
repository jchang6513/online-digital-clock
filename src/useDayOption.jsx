import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useReducer } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'toggle-date':
      return {
        ...state,
        date: !state.date,
      };
    case 'toggle-24hour':
      return {
        ...state,
        hour24: !state.hour24,
      };
    case 'toggle-second':
      return {
        ...state,
        second: !state.second,
      };
    case 'set-timezone':
      return {
        ...state,
        timezone: action.payload,
      };
    default:
      throw new Error();
  }
}

const initState = {
  date: true,
  hour24: true,
  second: true,
  timezone: dayjs.tz.guess(),
};

export const useDayOption = () => {
  return useReducer(reducer, initState);
};
