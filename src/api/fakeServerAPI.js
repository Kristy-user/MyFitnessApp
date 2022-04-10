import axios from 'axios';
import { store } from '../store/initStore';
import { logOut } from '../store/actions/user';
import {
  gotApiError,
  gotStatusCode,
} from '../store/actions/globalAppStateAction';

const fakeServerAPI = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

fakeServerAPI.interceptors.request.use(
  (request) => {
    request.headers.acces = store.getState().userReduser.isLoggedIn;
    return request;
  },
  (error) => {
    store.dispatch(gotApiError(error.message));
    console.log(error.message, error.response);
  }
);

fakeServerAPI.interceptors.response.use(
  (responce) => {
    return responce;
  },
  (error) => {
    if (error.code === 401) {
      store.dispatch(logOut());
      if (error.code === 404) {
        store.dispatch(gotStatusCode(404));
      }
      if (error.code === 400) {
        console.log(error.code);
      }
    } else if (error) {
      if (error.response) {
        console.log(error.response.data);
        store.dispatch(gotApiError(error.response.data));
      } else {
        store.dispatch(
          gotApiError(`Sorry server is currently unavailable: ${error.message}`)
        );
      }
      throw error;
    }
  }
);
export default fakeServerAPI;
