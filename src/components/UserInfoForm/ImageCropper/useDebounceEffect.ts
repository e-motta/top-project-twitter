import { useEffect } from "react";

export function useDebounceEffect(
  fn: () => void | Promise<void>,
  waitTime: number,
  deps?: any
) {
  useEffect(() => {
    const t = setTimeout(() => {
      void fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
