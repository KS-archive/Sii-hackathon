import { ADD_NOTIFICATION } from './types';

export const addNotification = (title, message, level) => {
  const notification = { title, message, level };
  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  };
};
