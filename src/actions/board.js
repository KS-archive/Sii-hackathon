import axios from 'axios';
import { CREATE_BOARD } from './types';

export function createBoard(obj, successCallback, errorCallback) {
  const url = `${__ROOT_URL__}createchannel`;
  const request = axios.post(url, obj);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: CREATE_BOARD,
        payload: name,
      });
      successCallback();
    }, errorCallback);
  };
}
