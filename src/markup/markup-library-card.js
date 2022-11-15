export function createMarkupCardsForLibrary({
  poster_path,
  id,
  title,
  genres,
  release_date,
  vote_average,
}) {
  const genreNames = genres.map(el => el.name).join(', ');
  const rating = vote_average.toFixed(2);
  return `
    <li data-id="${id}" class="movie__item">
      <img class="movie__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Poster of '${title}' movie" width="394" />
      <h2 class="movie__title">${title}</h2>
      <p class="movie__details">
          <span class="movie__genre">${genreNames}</span
          >|<span class="movie__year-of-relise">${release_date.slice(
            0,
            4
          )}</span><span class="movie__rating">${rating}</span>
      </p>
    </li>`;
}
