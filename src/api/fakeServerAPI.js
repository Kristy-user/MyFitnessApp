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
    console.log('success', request);
    request.headers.acces = store.getState().userReduser.isLoggedIn;
    return request;
  },
  (err) => console.log('error', err)
);

fakeServerAPI.interceptors.response.use(
  (responce) => {
    console.log('response', responce);
    return responce;
  },
  (error) => {
    console.log('success', error);
    if (error.code === 401) {
      store.dispatch(logOut({ logOutReason: 'session time out' }));
    } else {
      store.dispatch(gotApiError(error));
      throw error;
    }
  }
);
export default fakeServerAPI;
