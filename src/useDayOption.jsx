import { useReducer } from "react";

const reducer = (state, action) => {
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
    default:
      throw new Error();
  }
}

const initState = {
  date: true,
  hour24: true,
  second: true,
};

export const useDayOption = () => {
  return useReducer(reducer, initState);
};
