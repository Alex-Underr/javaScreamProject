import axios from 'axios';

const API_KEY = 'ecdc0bede86c5d627d8e7926f2be8d3a';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const searchFilms = 'search/movie';
const getTrendingFilms = 'trending/movie/day';

export function fetchTrendingFilms() {
  return axios.get(`${getTrendingFilms}`, {
    params: {
      api_key: API_KEY,
    },
  });
}

export function fetchSearchFilms(query) {
  return axios.get(`${searchFilms}`, {
    params: {
      api_key: API_KEY,
      query: query,
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
