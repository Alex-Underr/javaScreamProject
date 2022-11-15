import { fetchSearchFilms } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';

let page = 1;
let query = null;

const searchFilmData = async event => {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.elements.searchMovie.value;
  try {
    const { data } = await fetchSearchFilms(query, page);
    if (!data.results.length) {
      refs.gallery.innerHTML = '';
      refs.errorString.classList.remove('p__hidden');
      console.log(
        'Sorry, there are no films matching your search query. Please try again.'
      );
      return;
    }

    refs.errorString.classList.add('p__hidden');
    console.log(data);
    console.log(`Hooray! We found ${data.results.length} films!`);
    refs.gallery.innerHTML = createMarkupCards(data.results);
  } catch (err) {
    console.log(err);
  }
};

refs.searchBtn.addEventListener('submit', searchFilmData);
