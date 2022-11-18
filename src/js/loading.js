import Notiflix from 'notiflix';
import { fetchTrendingFilms } from './fetch';
import { createMarkupCards } from '../markup/markup';
import { refs } from './refs';
fetchTrendingFilms()
  .then(res => {
    Notiflix.Loading.pulse();
    refs.gallery.innerHTML = createMarkupCards(res.data.results);
    Notiflix.Loading.remove(250);
  })
  .catch(err => console.log('Catched error >>> ', err));
