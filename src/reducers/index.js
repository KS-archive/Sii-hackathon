import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import peopleReducer from './peopleReducer';
import ideasReducer from './ideasReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  people: peopleReducer,
  ideas: ideasReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
