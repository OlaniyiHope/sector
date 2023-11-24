// reducer.js

import { ADD_CATEGORIZED_DATA } from './actions';

const initialState = {
  categorizedData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIZED_DATA:
      return {
        ...state,
        categorizedData: [...state.categorizedData, ...action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
