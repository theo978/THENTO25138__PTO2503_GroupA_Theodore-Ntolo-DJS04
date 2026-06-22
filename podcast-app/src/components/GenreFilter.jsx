/**
 * Genre filter presented as a row of toggleable "preset" chips, echoing
 * the radio-preset signature used throughout the UI. Multiple genres
 * can be active at once (OR logic — a show matching any selected genre
 * is kept).
 *
 * @param {{
 *   genres: { id: number, title: string }[],
 *   selectedIds: number[],
 *   onToggle: (id: number) => void,
 *   onClear: () => void,
 * }} props
 */
export default function GenreFilter({ genres, selectedIds, onToggle, onClear }) {
  return (
    <div className="genre-filter">
      <span className="genre-filter__label">Presets</span>
      <div className="genre-filter__chips" role="group" aria-label="Filter by genre">
        {genres.map((genre) => {
          const isActive = selectedIds.includes(genre.id);
          return (
            <button
              key={genre.id}
              type="button"
              className={`genre-chip${isActive ? " genre-chip--active" : ""}`}
              aria-pressed={isActive}
              onClick={() => onToggle(genre.id)}
            >
              {genre.title}
            </button>
          );
        })}
        {selectedIds.length > 0 && (
          <button type="button" className="genre-filter__reset" onClick={onClear}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
