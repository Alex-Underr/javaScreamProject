export function createElementOfModalLibrary({
    genres,
    vote_count,
    original_title,
    popularity,
    vote_average,
    title,
    overview,
    poster_path,
    id,
  }) {
    const genresList = genres.map(el => el.name).join(', ');
    const popularRating = popularity.toFixed(1);
    const fixedVoteAverage = vote_average.toFixed(1);
    return `    <div class="modal">
    <button class="modal-btn-close" data-modal-close type="button">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="modal-btn-close">
            <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
            <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
        </svg>                
    </button>
    <div class="modal__container">  <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"  class="image__modal"  data-id="${id}">
             <div class="modal__content">  
                 <h2 class="modal__title js__modal__title">${title}</h2> 
                 <div class="modal__wrapper">
                     <ul class="text__list">
                         <li class="film__item js__film__item">Vote / Votes</li>
                         <li class="film__item js__film__item">Popularity</li>
                         <li class="film__item js__film__item">Original Title</li>
                         <li class="film__item js__film__item">Genre</li>
                     </ul>
                     <ul class="film__list js__film__list">
                         <li class=" film__text js__film__text"><span class="text__rating"> ${fixedVoteAverage} </span> / ${vote_count}</li>
                         <li class="film__text js__film__text">${popularRating}</li>
                         <li class="film__text js__film__text">${original_title}</li>
                         <li class="film__text js__film__text">${genresList}</li>
                     </ul>
                 </div><div descr__wrapper>
             <p class="description__headline js__description__headline">About</p>
             <p class="description__text js__description text">${overview}</p></div>
                 <div class="btn__wrapper"> 
                     <button class="btn btn__watched js__btn__watched" type="button" data-id="${id}">Remove from watched list</button>
                     <button class="btn btn__queue js__btn__queue" type="button" data-id="${id}">Remove from queued list</button>
                      <button class="btn__trailer btn" type="button" data-id="${id}">Watch trailer</button>
                 </div>
            
                 </div> 
                 </div>
              </div>`;
  }
  