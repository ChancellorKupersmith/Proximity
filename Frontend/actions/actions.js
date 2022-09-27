import * as types from '../constants/actionTypes';
// Example action object constructor
export const addCardActionCreator = marketId => ({
    type: types.ADD_CARD,
    payload: marketId,
  });