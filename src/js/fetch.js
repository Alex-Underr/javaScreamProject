import axios from 'axios';

const API_KEY = 'ecdc0bede86c5d627d8e7926f2be8d3a';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const searchFilms = 'search/movie';
const getTrendingFilms = 'trending/movie/day';

export function fetchTrendingFilms(page) {
  return axios.get(`${getTrendingFilms}`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
}

export function fetchSearchFilms(query, page) {
  return axios.get(`${searchFilms}`, {
    params: {
      api_key: API_KEY,
      query: query,
      page,
    },
  });
}

export function fetchByMovieId(id) {
  return axios.get(`movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
}

export function fetchSMovieTrailer(id) {
  return axios.get(`movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
}

// fetchTrendingFilms().then(res => {
//   console.log(res);
// });

// fetchSearchFilms('robocop').then(res => {
//   console.log(res);
// });

// fetchByMovieId('112').then(res => {
//   console.log(res);
// });

// fetchSMovieTrailer('13').then(res => {
//   console.log(res);
// });
