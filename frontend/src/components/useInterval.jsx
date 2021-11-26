import { useRef, useEffect } from "react";

// Resource: https://thesmartcoder.dev/awesome-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      let intervalID = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalID);
    }
  }, [delay]);
};

export default useInterval;
