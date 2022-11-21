import { refs } from './refs';
import {createTeamModalMarkup} from '../markup/markup-team-modal'

refs.openModalBtn.addEventListener('click', onOpenModal)
refs.backdrop.addEventListener('click', onCloseModal);


async function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onCloseModal, { once: true })
  try {
    const createTeamModal = await createTeamModalMarkup();
    refs.backdrop.innerHTML = createTeamModal;
  }
  catch (err){
    console.log(err)
  }
}

function onCloseModal({target, code}) {
  if (!target.classList.contains('backdrop-team') && 
  !target.classList.contains('js-close') && code !== 'Escape') {
    return;
  }
  refs.backdrop.classList.add('is-hidden');
  
}

