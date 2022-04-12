import axios from 'axios';
import { store } from '../store/initStore';
import { logOut } from '../store/actions/user';
import { gotApiError } from '../store/actions/globalAppStateAction';

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
    store.dispatch(
      gotApiError({
        text: error.message,
        date: new Date().toLocaleDateString(),
      })
    );
  }
);

fakeServerAPI.interceptors.response.use(
  (responce) => {
    return responce;
  },
  (error) => {
    if (error.code === 401) {
      store.dispatch(logOut());
    } else if (error) {
      if (error.response) {
        store.dispatch(
          gotApiError({
            text: error.response.data,
            date: new Date().toLocaleDateString(),
          })
        );
      } else {
        store.dispatch(
          gotApiError({
            text: `Sorry server is currently unavailable: ${error.message}`,
            date: new Date().toLocaleDateString(),
          })
        );
      }
    }

    throw error;
  }
);
export default fakeServerAPI;
