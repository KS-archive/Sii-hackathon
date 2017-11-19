import { CREATE_BOARD, CHANGE_PHASE, CHANGE_DEADLINE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_BOARD:
      return action.payload;

    case CHANGE_PHASE:
      return { ...state, phase: action.payload };

    case CHANGE_DEADLINE:
      return { ...state, time: action.payload };

    default:
      return state;
  }
}
