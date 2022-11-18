import { refs } from './refs';

refs.openModalBtn.addEventListener('click', onOpenModal)
// refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseModal);
// document.addEventListener('keydown', onEsc);


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
  // window.removeEventListener('keydown', onEsc);

}

// function onEsc(event) {
//   if (event.code !== 'Escape') {
//     return
//   }
//   onCloseModal();
// }

// function onBackdropClick(event) {
//   if (event.currentTarget === event.target) {
//     onCloseModal();
//   }
// }

// function onEsc(event) {
//   if (event.code === 'Escape') {
//     onCloseModal();
//   }
// }