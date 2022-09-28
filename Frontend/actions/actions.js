import * as types from '../constants/actionTypes';
// Example action object constructor
// export const addCardActionCreator = marketId => ({
//     type: types.ADD_CARD,
//     payload: marketId,
//   });

export const markerCreator = marker => ({
  type: types.ADD_MARKER,
  payload: marker,
});