import Notiflix from 'notiflix';
import { fetchByMovieId } from './fetch';
import { createMarkupCardsForLibrary } from '../markup/markup-library-card';
import { refs } from './refs';
import {
  typeWriterEffect,
  typeWriterEffectWatched,
  typeWriterEffectQueue,
} from './type-writer-effect';
import * as lsModule from './local-storage';

export function startPageLibrary() {
  refs.gallery.innerHTML = '';

  let watchedLibrary = localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [];

  let queueLibrary = localStorage.getItem('queue')
    ? JSON.parse(localStorage.getItem('queue'))
    : [];

  const libraryLocStorage = [...watchedLibrary, ...queueLibrary];

  if (libraryLocStorage.length === 0) {
    refs.gallery.classList.add('hidden');
    refs.notifi.classList.remove('hidden');

    typeWriterEffect('library');
    return;
  }
  refs.gallery.classList.remove('hidden');
  libraryLocStorage.forEach(element => {
    fetchByMovieId(element)
      .then(res => {
        refs.gallery.insertAdjacentHTML(
          'beforeend',
          createMarkupCardsForLibrary(res.data)
        );
      })
      .catch(err => console.log('Catched error >>> ', err));
  });
}

function onWatchedBtnclick() {
  refs.gallery.innerHTML = '';
  const watchedLocStorage = lsModule.loadFromLocStorage('watched');
  if (watchedLocStorage.length !== 0) {
    refs.gallery.classList.remove('hidden');
    refs.notifi.classList.add('hidden');

    watchedLocStorage.forEach(element => {
      fetchByMovieId(element)
        .then(res => {
          refs.gallery.insertAdjacentHTML(
            'beforeend',
            createMarkupCardsForLibrary(res.data)
          );
        })
        .catch(err => console.log('Catched error >>> ', err));
    });
  } else {
    refs.gallery.classList.add('hidden');
    refs.notifi.classList.remove('hidden');

    typeWriterEffectWatched('watched-list');
    console.log('You have not watched movies');
  }
}

function onQueueBtnclick() {
  refs.gallery.innerHTML = '';
  const queueLocStorage = lsModule.loadFromLocStorage('queue');
  if (queueLocStorage.length !== 0) {
    refs.gallery.classList.remove('hidden');
    refs.notifi.classList.add('hidden');

    queueLocStorage.forEach(element => {
      fetchByMovieId(element)
        .then(res => {
          refs.gallery.insertAdjacentHTML(
            'beforeend',
            createMarkupCardsForLibrary(res.data)
          );
        })
        .catch(err => console.log('Catched error >>> ', err));
    });
  } else {
    refs.gallery.classList.add('hidden');
    refs.notifi.classList.remove('hidden');

    typeWriterEffectQueue('queue-list');
    console.log('You have not movies in queue');
  }
}

startPageLibrary();

refs.watchedBtnLib.addEventListener('click', onWatchedBtnclick);

refs.quereBtnLib.addEventListener('click', onQueueBtnclick);
