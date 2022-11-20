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

export const pagination = new Pagination(container, options);
pagination.on('beforeMove', async function (evt) {
  try {
    const userInput = `${refs.searchInput.value}`;
    if (userInput) {
      Notiflix.Loading.pulse();
      const { data } = await fetchSearchFilms(userInput, evt.page);
      refs.gallery.innerHTML = createMarkupCards(data.results);
      Notiflix.Loading.remove(250);
      pagination.setTotalItems(data.total_results);
    } else {
      Notiflix.Loading.pulse();
      const { data } = await fetchTrendingFilms(evt.page);
      refs.gallery.innerHTML = createMarkupCards(data.results);

      Notiflix.Loading.remove(250);
    }
  } catch (err) {
    console.log(err, 'error here');
  }
});
pagination.on('afterMove', scrollToTop);
