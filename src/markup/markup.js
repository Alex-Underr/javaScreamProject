import { findGenreName, genresList } from '../js/genres-list';

export function createMarkupCards(data) {
  const markup = data
    .map(({ poster_path, id, title, genre_ids, release_date }) => {
      const genres = findGenreName(genresList, genre_ids).join(', ');
      return `
  <li data-id="${id}" class="movie__item">
    <img class="movie__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Poster of '${title}' movie" width="394" />
    <h2 class="movie__title">${title}</h2>
    <p data-id="${id}" class="movie__details">
        <span class="movie__genre">${genres}</span
        >|<span class="movie__year-of-relise">${release_date.slice(0, 4)}</span>
    </p>
  </li>`;
    })
    .join('');
  return markup;
}
