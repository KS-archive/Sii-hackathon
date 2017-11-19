import { ADD_IDEA, EDIT_IDEA, REMOVE_IDEA } from './types';


export function addIdea(ideas) {
  return {
    type: ADD_IDEA,
    payload: ideas,
  };
}
