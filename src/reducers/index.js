import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
