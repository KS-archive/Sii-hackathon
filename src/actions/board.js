import axios from 'axios';
import { CREATE_BOARD } from './types';

export function createBoard(name) {
  const url = `${__ROOT_URL__}createChannel`;
  const request = axios.post(url, { name });

  return (dispatch) => {
    request.then(({ data }) => {
      console.log(data);
      dispatch({
        type: CREATE_BOARD,
        payload: data.user,
      });
    });
  };
}
