import { createElementOfModalLibrary } from '../markup/markup-modal-library';
import { fetchByMovieId } from './fetch';
import { refs } from './refs';
import * as lsModule from './local-storage';
import Notiflix from 'notiflix';
import {onPlayTrailer} from './trailer';
import {startPageLibrary} from './loading_library';

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
    const createModal = await createElementOfModalLibrary(data);
    refs.backdropEl.innerHTML = createModal;
    Notiflix.Loading.remove();
    const watchedBtnEl = document.querySelector('.js__btn__watched');
    const ququedBtnEl = document.querySelector('.js__btn__queue');
    const filmCardEl = document.querySelector('.btn__trailer');
    filmCardEl.addEventListener('click', onPlayTrailer);
      watchedBtnEl.addEventListener('click', handleremoveFromWatched, {
        once: true,
      });
      ququedBtnEl.addEventListener('click', handleremoveFromQuuue, {
        once: true,
      });
      return;
    
  } catch (err) {
    console.log(err);
  }
}

function handleremoveFromWatched({ target }) {
    const watchedBtnId = target.dataset.id;
    lsModule.removeFromWatched(watchedBtnId);
    startPageLibrary();
  }
  
  function handleremoveFromQuuue({ target }) {
    const ququedBtnId = target.dataset.id;
    lsModule.removeFromQueue(ququedBtnId);
    startPageLibrary();
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
  
  