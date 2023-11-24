// actions.js

export const ADD_CATEGORIZED_DATA = 'ADD_CATEGORIZED_DATA';

export const addCategorizedData = (data) => {
  return {
    type: ADD_CATEGORIZED_DATA,
    payload: data,
  };
};
