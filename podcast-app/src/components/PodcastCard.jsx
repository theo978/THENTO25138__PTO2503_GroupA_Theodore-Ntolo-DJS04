import { getGenreTitles } from "../data/genres";

/**
 * Formats an ISO date string as a short, human-readable date.
 * @param {string} isoDate
 * @returns {string}
 */
function formatUpdated(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * A single podcast preview card: artwork, title, genre tags, season
 * count, and last-updated date.
 *
 * @param {{ podcast: object }} props
 */
export default function PodcastCard({ podcast }) {
  const genreTitles = getGenreTitles(podcast.genres);

  return (
    <article className="podcast-card">
      <div className="podcast-card__art-wrap">
        <img
          className="podcast-card__art"
          src={podcast.image}
          alt={`Cover art for ${podcast.title}`}
          loading="lazy"
        />
        <span className="podcast-card__seasons">
          {podcast.seasons} {podcast.seasons === 1 ? "season" : "seasons"}
        </span>
      </div>

      <div className="podcast-card__body">
        <h3 className="podcast-card__title">{podcast.title}</h3>

        {genreTitles.length > 0 && (
          <ul className="podcast-card__tags">
            {genreTitles.slice(0, 3).map((title) => (
              <li key={title} className="podcast-card__tag">
                {title}
              </li>
            ))}
          </ul>
        )}

        <p className="podcast-card__updated">
          Updated {formatUpdated(podcast.updated)}
        </p>
      </div>
    </article>
  );
}
