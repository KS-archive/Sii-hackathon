import { CREATE_BOARD } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_BOARD:
      return action.payload;

    default:
      return state;
  }
}
