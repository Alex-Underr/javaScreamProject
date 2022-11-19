import { createElementOfModal } from '../markup/markup-modal';
import { fetchByMovieId, fetchSMovieTrailer } from './fetch';
import { refs } from './refs';
import * as lsModule from './local-storage';
import * as basicLightbox from 'basiclightbox';
import Notiflix from 'notiflix';

refs.backdropEl.addEventListener('click', closeModal);
refs.gallery.addEventListener('click', handleOpenModal);

async function handleOpenModal(event) {
  if (
    !event.target.parentNode.classList.contains('movie__item') &&
    !event.target.parentNode.classList.contains('movie__details')
  ) {
    return;
  }
  refs.backdropEl.classList.remove('is-hidden');
  Notiflix.Loading.pulse({
    backgroundColor: 'rgba(0,0,0,0)',
  });
  document.addEventListener('keydown', closeModal, { once: true });
  try {
    const idOfCard = event.target.parentNode.dataset.id;
    const { data } = await fetchByMovieId(idOfCard);
    const createModal = await createElementOfModal(data);
    refs.backdropEl.innerHTML = createModal;
    Notiflix.Loading.remove();
    const watchedBtnEl = document.querySelector('.js__btn__watched');
    const ququedBtnEl = document.querySelector('.js__btn__queue');
    const filmCardEl = document.querySelector('.btn__trailer');
    filmCardEl.addEventListener('click', onPlayTrailer);

    if (location.href.indexOf('library') !== -1) {
      watchedBtnEl.textContent = 'Delete from watched list';
      ququedBtnEl.textContent = 'Delete from queue list';
      watchedBtnEl.addEventListener('click', handleremoveFromWatched, {
        once: true,
      });
      ququedBtnEl.addEventListener('click', handleremoveFromQuuue, {
        once: true,
      });
      return;
    }

    watchedBtnEl.addEventListener('click', handleAddInWatchedList, {
      once: true,
    });
    ququedBtnEl.addEventListener('click', handleAddInQueue, { once: true });
  } catch (err) {
    console.log(err);
  }
}
function handleAddInWatchedList({ target }) {
  const watchedBtnId = target.dataset.id;
  lsModule.addToWatchedLibrary(watchedBtnId);
}

function handleAddInQueue({ target }) {
  const ququedBtnId = target.dataset.id;
  lsModule.addToQueueLibrary(ququedBtnId);
}

function handleremoveFromWatched({ target }) {
  const watchedBtnId = target.dataset.id;
  lsModule.removeFromWatched(watchedBtnId);
}

function handleremoveFromQuuue({ target }) {
  const ququedBtnId = target.dataset.id;
  lsModule.removeFromQueue(ququedBtnId);
}

function closeModal({ target, code }) {
  if (
    !target.classList.contains('backdrop') &&
    !target.classList.contains('modal-btn-close') &&
    code !== 'Escape'
  ) {
    return;
  }
  refs.backdropEl.classList.add('is-hidden');
  refs.backdropEl.innerHTML = '';
}

async function onPlayTrailer(event) {
  if (!event.target.classList.contains('btn__trailer')) return;
  try {
    const id = event.target.dataset.id;
    Notiflix.Loading.pulse();
    const filmLink = await fetchSMovieTrailer(id);
    // console.log(filmLink.data.results[0].key);
    const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${filmLink.data.results[0].key}?cc_load_policy=3"   width="853"
  height="480" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
`);
    instance.show();
    (document.onkeydown = function (evt) {
      evt = evt || window.event;
      let isEscape = false;
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      } else {
        isEscape = evt.code === 27;
      }
      if (isEscape) {
        instance.close();
      }
    }),
      Notiflix.Loading.remove(250);
  } catch (error) {
    console.log(error);
  }
}
