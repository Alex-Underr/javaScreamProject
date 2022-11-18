import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import {
  fetchTrendingFilms,
  fetchSearchFilms,
  fetchByMovieId,
  fetchSMovieTrailer,
} from './fetch';

import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';
import Notiflix from 'notiflix';

const search = document.querySelector('.search__form');
const form = document.querySelector('.search__input');
const DEBOUNCE_DELAY = 500;
const PER_PAGE = 20;

const container = document.getElementById('pagination');
const options = {
  totalItems: 10000,
  itemsPerPage: PER_PAGE,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination(container, options);

pagination.on('afterMove', async function (evt) {
  try {
    Notiflix.Loading.pulse();
    const {
      data: { results },
    } = await fetchTrendingFilms(evt.page);
    refs.gallery.innerHTML = createMarkupCards(results);
    Notiflix.Loading.remove(250);
  } catch (err) {
    console.log(err, 'error here');
  }
});

// export const paginationSearch = new Pagination(container, options);
// // paginationSearch.on('beforeMove', function () {
// //   collectionEl.innerHTML = '';
// // });
// paginationSearch.on('afterMove', async function (evt) {
//   const moviesByKeyWord = await fetchSearchFilms(inputValue, evt.page);

//   refs.gallery.innerHTML = createMarkupCards(moviesByKeyWord);
// });

// let inputValue;

// form.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// export async function onFormInput(evt) {
//   inputValue = evt.target.value;
//   evt.preventDefault();
//   if (evt.target.value === '') {
//     return searchFilmData();
//   }
//     if (inputValue === ' ') {
//       return;
//   }

//   gallery.textContent = '';

//   paginationSearch.reset();
//   let page = 1;
//   const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue, page);
//   const loadGenres = await fetchGenres();
//   if (moviesByKeyWord.total_results === 0) {
//     failure();
//   }
//   if (moviesByKeyWord.total_results > 0) {
//     success(moviesByKeyWord.total_results);
//   }
//   container.classList.remove('visually-hidden');

//   renderMarkup(moviesByKeyWord, loadGenres);

//   if (moviesByKeyWord.total_results < 20) {
//     container.classList.add('visually-hidden');
//   } else {
//     container.classList.remove('visually-hidden');
//   }
// };
