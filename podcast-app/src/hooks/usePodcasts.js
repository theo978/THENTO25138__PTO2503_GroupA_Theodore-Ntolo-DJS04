import { useEffect, useState } from "react";

const API_URL = "https://podcast-api.netlify.app";

/**
 * Fetches the full podcast preview list once on mount and exposes
 * loading / error state alongside the data. The list is intentionally
 * fetched a single time — all search, sort, filter, and pagination work
 * happens client-side against this in-memory copy.
 *
 * @returns {{ podcasts: object[], isLoading: boolean, error: string|null }}
 */
export function usePodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPodcasts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setPodcasts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading podcasts."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPodcasts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { podcasts, isLoading, error };
}
