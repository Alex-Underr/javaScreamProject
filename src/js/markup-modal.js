export function createElementOfModal({genres, vote_count, original_title, popularity, vote_average, title,  overview, poster_path}){
    const genresList = genres.map(el=> el.name).join(', ')
    const popularRating = popularity.toFixed(2);
    const fixedVoteAverage = vote_average.toFixed(2);
           return `     <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"  class="image__modal">
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
                       <li class=" film__text js__film__text"><span class="text__rating">${fixedVoteAverage}</span> / ${vote_count}</li>
                       <li class="film__text js__film__text">${popularRating}</li>
                       <li class="film__text js__film__text">${original_title}</li>
                       <li class="film__text js__film__text">${genresList}</li>
                   </ul>
               </div><div descr__wrapper>
           <p class="description__headline js__description__headline">About</p>
           <p class="description__text js__description text">${overview}</p></div>
               <div class="btn__wrapper"> 
                   <button class="btn btn__watched js__btn__watched" type="button">add to Watched</button>
                   <button class="btn btn__queue js__btn__queue" type="button">add to queue</button>
               </div>
          
            </div>`
       }
      
   