refs ={
    backdropEl: document.querySelector('.backdrop'),
    filmCardEl: document.querySelector('.modal__container'),
    galleryListEl:document.querySelector('.js-movie-gallery'),
    closeBtnEl: document.querySelector('.modal-btn-close')
};

refs.galleryListEl.addEventListener('click', handleOpenModal);
refs.backdropEl.addEventListener('click', closeModal);
refs.closeBtnEl.addEventListener('click', closeModal);


function handleOpenModal(event){
    if(!event.target.parentNode.classList.contains('movie__item') &&!event.target.parentNode.classList.contains('movie__details')){
       return
    }
    refs.backdropEl.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscBtnPush);
}

function onEscBtnPush (event){
    if (event.code !== 'Escape') {
        return;
      }
      refs.backdropEl.classList.add('is-hidden');
      document.removeEventListener('keydown', onEscBtnPush);
}

function closeModal(event){
    if (
        !event.target.classList.contains('backdrop') &&
        !event.currentTarget.classList.contains('modal-btn-close')
      ) {
        return;
      } 
      refs.backdropEl.classList.add('is-hidden');
      document.removeEventListener('keydown', onEscBtnPush);
}
