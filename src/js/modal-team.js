import { refs } from './refs';

refs.openModalBtn.addEventListener('click', onOpenModal)
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onEsc);


function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEsc)
}

function onCloseModal(){
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onEsc);

}

function onEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

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