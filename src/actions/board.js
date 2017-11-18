import axios from 'axios';
import { CREATE_BOARD, ADD_IDEA, ADD_PERSON } from './types';

export function createBoard(obj, successCallback, errorCallback) {
  const url = `${__ROOT_URL__}createchannel`;
  const request = axios.post(url, obj);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: CREATE_BOARD,
        payload: obj,
      });
      successCallback();
    }, errorCallback);
  };
}

export function initializeBoard(roomName, callback) {
  const url = `${__ROOT_URL__}initialize/${roomName}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then((res) => {
      const { data } = res.data;
      const { name, phase, time } = data;
      dispatch({
        type: CREATE_BOARD,
        payload: { name, phase, time },
      });
      dispatch({
        type: ADD_IDEA,
        payload: data.idea,
      });
      dispatch({
        type: ADD_PERSON,
        payload: data.participants,
      });
      callback();
    });
  };
}
