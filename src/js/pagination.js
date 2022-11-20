import Pagination from 'tui-pagination';
import { fetchTrendingFilms, fetchSearchFilms } from './fetch';

import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { scrollToTop } from '../js/top-page';

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

// export const pagination = new Pagination(container, options);
// pagination.on('beforeMove', function () {
//   refs.gallery.innerHTML = '';
// });
// pagination.on('afterMove', async function (evt) {
//   try {
//     Notiflix.Loading.pulse();
//     const {
//       data: { results },
//     } = await fetchTrendingFilms(evt.page);
//     refs.gallery.innerHTML = createMarkupCards(results);

//     pagination.on('afterMove', scrollToTop);
//     Notiflix.Loading.remove(250);
//   } catch (err) {
//     console.log(err, 'error here');
//   }
// });

export const pagination = new Pagination(container, options);
pagination.on('beforeMove', async function (evt) {
  try {
    const userInput = `${refs.searchInput.value}`;
    if (userInput) {
      Notiflix.Loading.pulse();
      const { data } = await fetchSearchFilms(userInput, evt.page);
      refs.gallery.innerHTML = createMarkupCards(data.results);

      Notiflix.Loading.remove(250);
    } else {
      Notiflix.Loading.pulse();
      const { data } = await fetchTrendingFilms(evt.page);
      console.log(data);
      refs.gallery.innerHTML = createMarkupCards(data.results);

      Notiflix.Loading.remove(250);
    }
  } catch (err) {
    console.log(err, 'error here');
  }
});
pagination.on('afterMove', scrollToTop);

// export const paginationSearch = new Pagination(container, options);
// let inputValue;

// export async function onFormInput(evt) {
//   inputValue = evt.target.value;
//   evt.preventDefault();
//   if (evt.target.value === '') {
//     return searchFilmData();
//   }
//     if (inputValue === ' ') {
//       return;
//   }

//   refs.gallery.textContent = '';

//   paginationSearch.reset();
//   let page = 1;
//   const moviesByKeyWord = await fetchSearchFilms(inputValue, page);
//   const loadGenres = await fetchTrendingFilms();
//   if (moviesByKeyWord.total_results === 0) {
//     console.log();
//   }
//   if (moviesByKeyWord.total_results > 0) {
//     console.log(moviesByKeyWord.total_results);
//   }
//   container.classList.remove('visually-hidden');

//   createMarkupCards(moviesByKeyWord, fetchTrendingFilms);

//   if (moviesByKeyWord.total_results < 20) {
//     container.classList.add('visually-hidden');
//   } else {
//     container.classList.remove('visually-hidden');
//   }
// };

// paginationSearch.on('beforeMove', function (evt) {
//   refs.gallery.innerHTML = '';
// });
// paginationSearch.on('afterMove', async function (evt) {

//   try {
//     Notiflix.Loading.pulse();
//     const {
//       data: { results },
//     } = await fetchSearchFilms(inputValue, evt.page);
//     refs.gallery.innerHTML = createMarkupCards(results);

//     Notiflix.Loading.remove(250);
//   } catch (err) {
//     console.log(err, 'error here');
//   }

// });
