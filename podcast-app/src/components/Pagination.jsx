/**
 * Builds a condensed list of page numbers to display, with `"…"`
 * placeholders for skipped ranges, e.g. [1, "…", 4, 5, 6, "…", 20].
 *
 * @param {number} current
 * @param {number} total
 * @returns {Array<number|string>}
 */
function buildPageWindow(current, total) {
  const window = 1; // pages shown on either side of current
  const pages = new Set([1, total, current]);

  for (let offset = 1; offset <= window; offset += 1) {
    pages.add(current - offset);
    pages.add(current + offset);
  }

  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result = [];
  let previous = null;
  for (const page of sorted) {
    if (previous !== null && page - previous > 1) {
      result.push("…");
    }
    result.push(page);
    previous = page;
  }
  return result;
}

/**
 * Page navigation control. Always respects the caller's current
 * search/filter/sort state since it only ever changes the page number.
 *
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   onPageChange: (page: number) => void,
 * }} props
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageWindow = buildPageWindow(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Prev
      </button>

      <ul className="pagination__pages">
        {pageWindow.map((page, index) =>
          page === "…" ? (
            <li key={`ellipsis-${index}`} className="pagination__ellipsis">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={`pagination__page${
                  page === currentPage ? " pagination__page--active" : ""
                }`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </nav>
  );
}
