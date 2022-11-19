import { refs } from './refs';

refs.openModalBtn.addEventListener('click', onOpenModal)
refs.backdrop.addEventListener('click', onCloseModal);


function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onCloseModal, {once: true})
}

function onCloseModal({target, code}) {
  if (!target.classList.contains('backdrop-team') && 
  !target.classList.contains('js-close') && code !== 'Escape') {
    return;
  }
  refs.backdrop.classList.add('is-hidden');
  
}

