import { useEffect, useState, useRef } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setDebouncedValue(value);
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
