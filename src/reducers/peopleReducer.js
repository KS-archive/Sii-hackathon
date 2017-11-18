import { ADD_PERSON, REMOVE_PERSON } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      return action.payload;

    case REMOVE_PERSON:
      return action.payload;

    default:
      return state;
  }
}
