/**
 * Search input for filtering podcasts by title. Controlled component —
 * the parent owns the value so it can stay in sync with the rest of the
 * filter/sort/pagination state.
 *
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search shows by title…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search podcasts by title"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
