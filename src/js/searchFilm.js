import { fetchSearchFilms } from '../src/js/fetch';
const searchBtn = document.querySelector('.search__form');

let page = 1;

let query = null;

const fetchSearchFilms = async event => {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.elements.query.value;
  try {
    const { data } = await fetchSearchFilms(query, page);
    if (!data.results) {
      galleryList.innerHTML = '';
      console.log(
        'Sorry, there are no films matching your search query. Please try again.'
      );
      return;
    }
    console.log(`Hooray! We found ${data.results.length} films!`);
    // js-main-container.innerHTML = ``;

    // if (data.hits.length === 40) {
    //   loadMoreBtn.classList.remove('is-hidden');
    // }
  } catch (err) {
    console.log(err);
  }
};

searchBtn.addEventListener('submit', fetchSearchFilms);
