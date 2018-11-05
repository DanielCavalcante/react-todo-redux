import axios from 'axios';

const API = 'http://localhost:3000/api/todos';

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
});

export const search = () => {
  const request = axios.get(`${API}?sort=-createdAt`);
  return {
    type: 'TODO_SEARCHED',
    payload: request
  }
}