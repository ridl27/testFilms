import axios from 'axios';
export const getFilms = () => dispatch => {
  return axios.get('/films')
    .then(res => res.data)
    .then(films => dispatch({ type: 'GET_FILMS', payload: films }))
}
