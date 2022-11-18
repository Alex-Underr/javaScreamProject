import Notiflix from 'notiflix';
import { fetchSearchFilms } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';
let page = 1;
let query = null;

const searchFilmData = async event => {
  event.preventDefault();
  Notiflix.Loading.pulse();
  page = 1;
  query = event.currentTarget.elements.searchMovie.value;
  try {
    const { data } = await fetchSearchFilms(query, page);
    if (!data.results.length) {
      refs.gallery.innerHTML = '';
      refs.errorString.classList.remove('p__hidden');
      Notiflix.Loading.remove();
      console.log(
        'Sorry, there are no films matching your search query. Please try again.'
      );
      return;
    }

    refs.errorString.classList.add('p__hidden');
    Notiflix.Loading.pulse();
    console.log(`Hooray! We found ${data.results.length} films!`);
    refs.gallery.innerHTML = createMarkupCards(data.results);
    Notiflix.Loading.remove(250);
  } catch (err) {
    console.log(err);
  }
};
if (refs.gallery) {
  refs.searchBtn.addEventListener('submit', searchFilmData);

  return;
}
