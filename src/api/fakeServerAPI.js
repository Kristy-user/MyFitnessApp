import axios from 'axios';
import { store } from '../store/initStore';
import { logOut } from '../store/actions/user';
import { gotApiError } from '../store/actions/globalAppStateAction';
import { apiError } from '../store/selectors/globalAppState';
const fakeServerAPI = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

fakeServerAPI.interceptors.request.use(
  (request) => {
    store.dispatch(gotApiError(''));
    request.headers.acces = store.getState().userReduser.isLoggedIn;
    return request;
  },
  (error) => {
    store.dispatch(gotApiError(error.message));
  }
);

fakeServerAPI.interceptors.response.use(
  (responce) => {
    store.dispatch(gotApiError(''));
    return responce;
  },
  (error) => {
    if (error.code === 401) {
      store.dispatch(logOut());
    } else if (error) {
      store.dispatch(gotApiError(error.message));
      throw error;
    }
  }
);
export default fakeServerAPI;
