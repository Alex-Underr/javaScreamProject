import { createElementOfModal } from '../markup/markup-modal';
import { fetchByMovieId, fetchSMovieTrailer } from './fetch';
import { refs } from './refs';

refs.backdropEl.addEventListener('click', closeModal);
refs.closeBtnEl.addEventListener('click', closeModal);

if (!refs.gallery) {
  document.removeEventListener('click', handleOpenModal);
  refs.galleryLib.addEventListener('click', handleOpenModal);
} else {
  document.removeEventListener('click', handleOpenModal);
  refs.gallery.addEventListener('click', handleOpenModal);
}

async function handleOpenModal(event) {
  if (
    !event.target.parentNode.classList.contains('movie__item') &&
    !event.target.parentNode.classList.contains('movie__details')
  ) {
    return;
  }
  refs.backdropEl.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscBtnPush);
  try {
    const idOfCard = event.target.parentNode.dataset.id;
    const { data } = await fetchByMovieId(idOfCard);
    const createModal = await createElementOfModal(data);
    refs.filmCardEl.innerHTML = createModal;
  } catch (err) {
    console.log(err);
  }
}

function onEscBtnPush(event) {
  if (event.code !== 'Escape') {
    return;
  }
  refs.backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscBtnPush);
  refs.filmCardEl.innerHTML = '';
}

function closeModal(event) {
  if (
    !event.target.classList.contains('backdrop') &&
    !event.currentTarget.classList.contains('modal-btn-close')
  ) {
    return;
  }
  refs.backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscBtnPush);
  refs.filmCardEl.innerHTML = '';
}
// ----------trailer---------
import * as basicLightbox from 'basiclightbox';

refs.filmCardEl.addEventListener('click', onPlayTrailer);

async function onPlayTrailer(event) {
  if (!event.target.classList.contains('btn__trailer')) return;
  try {
    const id = event.target.dataset.id;
    const filmLink = await fetchSMovieTrailer(id);
    console.log(filmLink.data.results[0].key);
    const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${filmLink.data.results[0].key}" width="560" height="315" frameborder="0"></iframe>
`);

    instance.show();
  } catch (error) {
    console.log(error);
  }
}
