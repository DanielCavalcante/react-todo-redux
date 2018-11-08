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
};

export const add = (description) => {
  return dispatch => {
    axios.post(API, { description })
      .then(res => dispatch({type: 'TODO_ADDED', payload: res.data}))
      .then(res => dispatch(search()))
  }
};

export const maskAsDone = (todo) => {
  return dispatch => {
    axios.put(`${API}/${todo._id}`, { ...todo, done: true })
      .then(res => dispatch(search()))
  };
};

export const markAsPending = (todo) => {
  return dispatch => {
    axios.put(`${API}/${todo._id}`, { ...todo, done: false })
      .then(res => dispatch(search()))
  }
};