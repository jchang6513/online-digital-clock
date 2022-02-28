import { useEffect, useState } from "react";

export const useMouseMoving = (throttle = 10000) => {
  const [mouseMoving, setMouseMoving] = useState(false);

  useEffect(() => {
    if (mouseMoving) {
      const timeout = setTimeout(() => {
        setMouseMoving(false);
      }, throttle);
      return () => clearTimeout(timeout);
    }
  }, [mouseMoving, throttle]);

  return [
    mouseMoving,
    () => setMouseMoving(true),
  ];
}
