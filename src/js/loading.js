import Notiflix from 'notiflix';
import { fetchTrendingFilms } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';

fetchTrendingFilms()
  .then(res => {
    refs.gallery.innerHTML = createMarkupCards(res.data.results);
  })
  .catch(err => console.log('Catched error >>> ', err));
