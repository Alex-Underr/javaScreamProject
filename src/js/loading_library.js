import { fetchByMovieId, fetchAllByMovieId } from './fetch';
import { createMarkupCardsForLibrary } from '../markup/markup-library-card';
import { refs } from './refs';
import * as lsModule from './local-storage';

function onWatchedBtnclick() {
  refs.galleryLib.innerHTML = '';
  const watchedLocStorage = lsModule.loadFromLocStorage('watched');
  watchedLocStorage.forEach(element => {
    fetchByMovieId(element)
      .then(res => {
        refs.galleryLib.insertAdjacentHTML(
          'beforeend',
          createMarkupCardsForLibrary(res.data)
        );
      })
      .catch(err => console.log('Catched error >>> ', err));
  });
}

function onQuereBtnclick() {
  refs.galleryLib.innerHTML = '';
  const quereLocStorage = lsModule.loadFromLocStorage('queue');
  quereLocStorage.forEach(element => {
    fetchByMovieId(element)
      .then(res => {
        refs.galleryLib.insertAdjacentHTML(
          'beforeend',
          createMarkupCardsForLibrary(res.data)
        );
      })
      .catch(err => console.log('Catched error >>> ', err));
  });
}

refs.watchedBtnLib.addEventListener('click', onWatchedBtnclick);

refs.quereBtnLib.addEventListener('click', onQuereBtnclick);
