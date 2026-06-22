/**
 * @typedef {object} Podcast
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {number} seasons
 * @property {string} updated
 * @property {number[]} genres
 */

export const SORT_OPTIONS = {
  NEWEST: "newest",
  TITLE_ASC: "title-asc",
  TITLE_DESC: "title-desc",
};

export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: "Newest first",
  [SORT_OPTIONS.TITLE_ASC]: "Title A–Z",
  [SORT_OPTIONS.TITLE_DESC]: "Title Z–A",
};

/**
 * Case-insensitive substring match against a podcast's title.
 *
 * @param {Podcast[]} podcasts
 * @param {string} searchTerm
 * @returns {Podcast[]}
 */
export function filterBySearch(podcasts, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return podcasts;
  return podcasts.filter((podcast) =>
    podcast.title?.toLowerCase().includes(term)
  );
}

/**
 * Keeps only podcasts that belong to at least one of the selected genre ids.
 * An empty selection means "no filter applied" (everything passes).
 *
 * @param {Podcast[]} podcasts
 * @param {number[]} selectedGenreIds
 * @returns {Podcast[]}
 */
export function filterByGenres(podcasts, selectedGenreIds) {
  if (!selectedGenreIds.length) return podcasts;
  const selected = new Set(selectedGenreIds);
  return podcasts.filter((podcast) =>
    (podcast.genres ?? []).some((genreId) => selected.has(genreId))
  );
}

/**
 * Sorts podcasts by the given sort key. Always returns a new array;
 * never mutates the input.
 *
 * @param {Podcast[]} podcasts
 * @param {string} sortKey - One of SORT_OPTIONS.
 * @returns {Podcast[]}
 */
export function sortPodcasts(podcasts, sortKey) {
  const sorted = [...podcasts];

  switch (sortKey) {
    case SORT_OPTIONS.TITLE_ASC:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case SORT_OPTIONS.TITLE_DESC:
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case SORT_OPTIONS.NEWEST:
    default:
      return sorted.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
  }
}

/**
 * Slices a list down to a single page.
 *
 * @param {Podcast[]} podcasts
 * @param {number} page - 1-indexed page number.
 * @param {number} pageSize
 * @returns {Podcast[]}
 */
export function paginate(podcasts, page, pageSize) {
  const start = (page - 1) * pageSize;
  return podcasts.slice(start, start + pageSize);
}

/**
 * Runs the full search -> genre filter -> sort pipeline and returns the
 * resulting list. Pagination is applied separately by the caller so it
 * can also derive total page counts from the same intermediate result.
 *
 * @param {Podcast[]} podcasts
 * @param {{ searchTerm: string, genreIds: number[], sortKey: string }} criteria
 * @returns {Podcast[]}
 */
export function applyFilters(podcasts, { searchTerm, genreIds, sortKey }) {
  const searched = filterBySearch(podcasts, searchTerm);
  const filtered = filterByGenres(searched, genreIds);
  return sortPodcasts(filtered, sortKey);
}
