import { fetchSearchFilms } from './fetch';
const searchBtn = document.querySelector('.search__form');
const mainContainer = document.querySelector('.js-main-container');
const errorString = document.querySelector('.p__header');

let page = 1;
let query = null;

const searchFilmData = async event => {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.elements.searchMovie.value;
  try {
    const { data } = await fetchSearchFilms(query, page);
    if (!data.results.length) {
      mainContainer.innerHTML = '';
      errorString.classList.remove('p__hidden');
      console.log(
        'Sorry, there are no films matching your search query. Please try again.'
      );
      return;
    }

    errorString.classList.add('p__hidden');
    console.log(`Hooray! We found ${data.results.length} films!`);
    mainContainer.innerHTML = '';

    // if (data.hits.length === 40) {
    //   loadMoreBtn.classList.remove('is-hidden');
    // }
  } catch (err) {
    console.log(err);
  }
};

searchBtn.addEventListener('submit', searchFilmData);
