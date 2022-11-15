import './js/modal';

import { fetchTrendingFilms } from '../src/js/fetch';
import { fetchSearchFilms } from '../src/js/fetch';
import { fetchByMovieId } from '../src/js/fetch';
import { fetchSMovieTrailer } from '../src/js/fetch';

// fetchTrendingFilms().then(res => {
//   console.log(res);
// });

// fetchSearchFilms('robocop').then(res => {
//   console.log(res);
// });

fetchByMovieId('62d49a7072c13e00548a1340').then(res => {
  console.log(res);
});

// fetchSMovieTrailer('13').then(res => {
//   console.log(res);
// });
