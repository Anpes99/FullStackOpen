const initialState = { filter: '' };

export const setFilter = (filter) => {
  if (filter !== null) {
    return { type: 'SET_FILTER', data: { filter } };
  }
  return { type: 'SET_FILTER', data: { filter: '' } };
};

const filterReducer = (state = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    if (action.data) {
      if (action.data.filter) {
        return { filter: action.data.filter };
      }
    }
  }

  return state;
};

export default filterReducer;
