import PodcastCard from "./PodcastCard";

/**
 * Renders the current page of podcasts as a responsive grid, or an
 * empty-state message when no podcasts match the active filters.
 *
 * @param {{ podcasts: object[] }} props
 */
export default function PodcastGrid({ podcasts }) {
  if (podcasts.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No shows on this frequency.</p>
        <p className="empty-state__hint">
          Try a different search term or clear a preset.
        </p>
      </div>
    );
  }

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
