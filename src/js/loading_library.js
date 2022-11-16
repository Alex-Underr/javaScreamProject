import { fetchByMovieId } from './fetch';
import { createMarkupCardsForLibrary } from '../markup/markup-library-card';
import { refs } from './refs';

// Для прикладу взято ID фільму "Poker Face" - 842934
fetchByMovieId(842934)
  .then(res => {
    refs.galleryLib.innerHTML = createMarkupCardsForLibrary(res.data);
  })
  .catch(err => console.log('Catched error >>> ', err));
