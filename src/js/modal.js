import {createElementOfModal} from '../markup/markup-modal';
import {fetchByMovieId} from './fetch';
import { refs } from './refs';

refs.backdropEl.addEventListener('click', closeModal);
// refs.closeBtnEl.addEventListener('click', closeModal);


if(!refs.gallery){
  document.removeEventListener('click', handleOpenModal);
  refs.galleryLib.addEventListener('click', handleOpenModal);
}else {
  document.removeEventListener('click', handleOpenModal);
  refs.gallery.addEventListener('click', handleOpenModal);
}

async function handleOpenModal(event){
    if(!event.target.parentNode.classList.contains('movie__item') &&!event.target.parentNode.classList.contains('movie__details')){
       return
    }
    refs.backdropEl.classList.remove('is-hidden');
    document.addEventListener('keydown', closeModal, {once: true});
    try{ const idOfCard = event.target.parentNode.dataset.id;
      const {data} = await fetchByMovieId(idOfCard);
      const createModal = await createElementOfModal(data);
      refs.backdropEl.innerHTML = createModal
    }
   catch (err){
    console.log(err);
   }

    
}

// function onEscBtnPush (event){
//     if (event.code !== 'Escape') {
//         return;
//       }
//       refs.backdropEl.classList.add('is-hidden');
//       document.removeEventListener('keydown', onEscBtnPush);
//       refs.filmCardEl.innerHTML ='';
// }

function closeModal({target, code}){
    if (
        !target.classList.contains('backdrop') &&
        !target.classList.contains('modal-btn-close') && code !=='Escape'
      ) {
        return;
      } 
      refs.backdropEl.classList.add('is-hidden');
      refs.backdropEl.innerHTML ='';

}
