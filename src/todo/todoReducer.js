const INITIAL_STATE = {
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
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'DESCRIPTION_CHANGED': 
      return { ...state, description: action.payload };
    default:
      return state;
  };
};