import { ADD_NOTIFICATION } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];

    default:
      return state;
  }
}
