import { fetchTrendingFilms, fetchByMovieId } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { createMarkupCardsForLibrary } from '../markup/markup-library-card';
import { refs } from './refs';

fetchTrendingFilms()
  .then(res => {
    refs.gallery.innerHTML = createMarkupCards(res.data.results);
  })
  .catch(err => console.log('Catched error >>> ', err));

// Для прикладу взято ID фільму "Poker Face" - 842934
fetchByMovieId(842934)
  .then(res => {
    refs.galleryLib.innerHTML = createMarkupCardsForLibrary(res.data);
  })
  .catch(err => console.log('Catched error >>> ', err));
