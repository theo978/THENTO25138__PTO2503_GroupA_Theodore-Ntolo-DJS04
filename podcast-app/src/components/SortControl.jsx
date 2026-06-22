import { SORT_LABELS, SORT_OPTIONS } from "../utils/podcastUtils";

/**
 * Dropdown for choosing the active sort order.
 *
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SortControl({ value, onChange }) {
  return (
    <label className="sort-control">
      <span className="sort-control__label">Tune by</span>
      <select
        className="sort-control__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Sort podcasts"
      >
        {Object.values(SORT_OPTIONS).map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
