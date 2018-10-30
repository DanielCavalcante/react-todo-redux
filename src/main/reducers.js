import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todo: () => ({
    description: 'Torou dento!',
    list: [
      {
        _id: 1,
        description: 'Nena',
        done: true
      },
      {
        _id: 2,
        description: 'Xuxinha',
        done: false 
      },
      {
        _id: 3,
        description: 'Groot',
        done: false
      }
    ]
  })
});

export default rootReducer;