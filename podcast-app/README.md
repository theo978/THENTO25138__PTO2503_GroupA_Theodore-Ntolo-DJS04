# Frequency — Podcast Search, Sort, Filter & Pagination

A React app for browsing podcasts from the [Podcast Preview API](https://podcast-api.netlify.app), with live search, genre filtering, sorting, and pagination that all stay in sync with one another.

## Overview

The app fetches the full podcast preview list once on load, then does all the work client-side: typing in the search box, toggling a genre preset, or changing the sort order all run against the same in-memory list, so any combination of filters can be applied together without losing your place. Changing the page never resets your search, filter, or sort — and changing search/filter/sort sends you back to page 1, since the result set just changed size.

## Features

- **Search** — live, debounced, case-insensitive substring match on podcast titles.
- **Sort** — Newest first (by last-updated date), Title A–Z, Title Z–A.
- **Filter** — multi-select genre "presets"; a show matching *any* selected genre is kept (OR logic). Genre IDs from the API are resolved to titles using `src/data/genres.js`.
- **Pagination** — 12 shows per page, with numbered page buttons (condensed with `…` for large page counts) plus Prev/Next.
- **State sync** — all four controls read from and write to a single set of state values owned by `App.jsx`; the visible list is derived from that state via a pure pipeline (`search → genre filter → sort → paginate`) in `src/utils/podcastUtils.js`.

## Project structure

```
src/
  App.jsx                  # owns all state, wires controls to the data pipeline
  App.css / index.css       # styling
  data/genres.js            # genre id -> title mapping (provided dataset)
  hooks/
    usePodcasts.js          # fetches the podcast list once on mount
    useDebouncedValue.js    # debounces the search input
  utils/
    podcastUtils.js         # filterBySearch, filterByGenres, sortPodcasts, paginate, applyFilters
  components/
    SearchBar.jsx
    GenreFilter.jsx
    SortControl.jsx
    PodcastGrid.jsx
    PodcastCard.jsx
    Pagination.jsx
    StatusBanner.jsx        # loading / error states
```

Every exported function and component carries a JSDoc comment describing its parameters and return value.

## Setup

```bash
npm install
npm run dev
```

This starts a Vite dev server (default `http://localhost:5173`). No environment variables or API keys are required — the app calls the public podcast API directly.

To build a production bundle:

```bash
npm run build
npm run preview   # serve the build locally to sanity-check it
```

## Notes on data

The API returns a `genres` array of numeric IDs per show, with no titles attached. `src/data/genres.js` supplies the id → title mapping (and the original genre → show list from the brief) so the UI can render genre tags and power the filter chips without a second network call.
