import Notiflix from 'notiflix';
import { fetchSearchFilms } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';
let page = 1;
let query = null;

const searchFilmData = async event => {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.elements.searchMovie.value;
  if (!query) {
    Notiflix.Report.warning(
      '',
      'Please, enter your query in the search form!',
      'Okay',
      {
        svgSize: '80px',
        width: '310px',
      }
    );
  }
  try {
    const { data } = await fetchSearchFilms(query, page);

    if (!data.results.length) {
      refs.gallery.innerHTML = '';
      refs.errorString.classList.remove('p__hidden');
      return;
    }

    refs.errorString.classList.add('p__hidden');
    Notiflix.Loading.pulse();
    Notiflix.Notify.info(`We found for you ${data.results.length} films!`);
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
