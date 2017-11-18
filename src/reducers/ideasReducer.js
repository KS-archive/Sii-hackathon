import { ADD_IDEA, EDIT_IDEA, REMOVE_IDEA } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_IDEA:
      return action.payload;

    case EDIT_IDEA:
      return action.payload;

    case REMOVE_IDEA:
      return action.payload;

    default:
      return state;
  }
}
