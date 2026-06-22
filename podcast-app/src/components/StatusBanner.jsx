/**
 * Shows a loading or error message in place of the podcast grid.
 * Returns null when there's nothing to report, so it's safe to render
 * unconditionally.
 *
 * @param {{ isLoading: boolean, error: string|null }} props
 */
export default function StatusBanner({ isLoading, error }) {
  if (error) {
    return (
      <div className="status-banner status-banner--error" role="alert">
        <p className="status-banner__title">Signal lost.</p>
        <p className="status-banner__detail">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="status-banner status-banner--loading" aria-live="polite">
        <span className="tuning-bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <p>Tuning in to the podcast feed…</p>
      </div>
    );
  }

  return null;
}
