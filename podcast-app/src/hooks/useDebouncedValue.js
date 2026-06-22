import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after `delay`
 * milliseconds of no further changes. Used so typing in the search box
 * doesn't trigger a re-filter on every keystroke.
 *
 * @template T
 * @param {T} value - The fast-changing value to debounce.
 * @param {number} [delay=250] - Debounce window in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
}
