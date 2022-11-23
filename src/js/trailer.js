import * as basicLightbox from 'basiclightbox';
import Notiflix from 'notiflix';
import { fetchSMovieTrailer } from './fetch';

export async function onPlayTrailer(event) {
    if (!event.target.classList.contains('btn__trailer')) return;
    try {
      const id = event.target.dataset.id;
      Notiflix.Loading.pulse();
      const filmLink = await fetchSMovieTrailer(id);
      const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${filmLink.data.results[0].key}?cc_load_policy=3"   width="853"
    height="480" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
  `);
      instance.show();
      (document.onkeydown = function (evt) {
        evt = evt || window.event;
        let isEscape = false;
        if ('key' in evt) {
          isEscape = evt.key === 'Escape' || evt.key === 'Esc';
        } else {
          isEscape = evt.code === 27;
        }
        if (isEscape) {
          instance.close();
        }
      }),
        Notiflix.Loading.remove(250);
    } catch (error) {
      console.log(error);
    }
  }
  