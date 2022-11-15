import { fetchTrendingFilms } from './fetch';

const refs = {
  main: document.querySelector('.js-main-container'),
  gallery: document.querySelector('.js-movie-gallery'),
};

function createMarkupCard({ poster_path, id, title, genre_ids, release_date }) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `
  <li data-id="${id}" class="movie__item">
    <img class="movie__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Poster of '${title}' movie" width="394" />
    <h2 class="movie__title">${title}</h2>
    <p class="movie__details">
        <span class="movie__genre">${genre_ids}</span
        >|<span class="movie__year-of-relise">${release_date.slice(0, 4)}</span>
    </p>
  </li>`
  );
}

fetchTrendingFilms().then(res => {
  const newArr = res.data.results;
  console.log(newArr);
  refs.gallery.innerHTML = '';
  newArr.forEach(arr => createMarkupCard(arr));
});

// refs.main.insertAdjacentHTML('beforeend', `<div>SPINNER</div>`);
// ☝️ посилання на дів в мейні для спінера
