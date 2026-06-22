import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { usePodcasts } from "./hooks/usePodcasts";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { genres } from "./data/genres";
import {
  applyFilters,
  paginate,
  SORT_OPTIONS,
} from "./utils/podcastUtils";

import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import SortControl from "./components/SortControl";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import StatusBanner from "./components/StatusBanner";

const PAGE_SIZE = 12;

/**
 * Root component. Owns the single source of truth for every control —
 * search term, genre filter, sort order, and current page — and derives
 * the visible podcast list from that state on every render via the
 * search -> filter -> sort -> paginate pipeline in utils/podcastUtils.js.
 */
export default function App() {
  const { podcasts, isLoading, error } = usePodcasts();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [sortKey, setSortKey] = useState(SORT_OPTIONS.NEWEST);
  const [currentPage, setCurrentPage] = useState(1);

  // Any change to the active criteria should land the user back on page
  // 1 — the previous page number may no longer exist for a smaller
  // result set — while the criteria themselves stay applied as pages
  // are subsequently turned.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedGenreIds, sortKey]);

  const filteredAndSorted = useMemo(
    () =>
      applyFilters(podcasts, {
        searchTerm: debouncedSearchTerm,
        genreIds: selectedGenreIds,
        sortKey,
      }),
    [podcasts, debouncedSearchTerm, selectedGenreIds, sortKey]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / PAGE_SIZE)
  );
  const visiblePodcasts = useMemo(
    () => paginate(filteredAndSorted, currentPage, PAGE_SIZE),
    [filteredAndSorted, currentPage]
  );

  /** Toggles a genre id in/out of the active filter set. */
  function handleGenreToggle(genreId) {
    setSelectedGenreIds((previous) =>
      previous.includes(genreId)
        ? previous.filter((id) => id !== genreId)
        : [...previous, genreId]
    );
  }

  /** Changes page and scrolls the grid back into view. */
  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasResults = !isLoading && !error && podcasts.length > 0;

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__dial" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div>
            <h1 className="brand__name">Frequency</h1>
            <p className="brand__tagline">Find your next podcast.</p>
          </div>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      {hasResults && (
        <section className="controls">
          <GenreFilter
            genres={genres}
            selectedIds={selectedGenreIds}
            onToggle={handleGenreToggle}
            onClear={() => setSelectedGenreIds([])}
          />
          <div className="controls__meta">
            <p className="controls__count">
              {filteredAndSorted.length}{" "}
              {filteredAndSorted.length === 1 ? "show" : "shows"}
            </p>
            <SortControl value={sortKey} onChange={setSortKey} />
          </div>
        </section>
      )}

      <main className="app__main">
        <StatusBanner isLoading={isLoading} error={error} />
        {hasResults && (
          <>
            <PodcastGrid podcasts={visiblePodcasts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}
