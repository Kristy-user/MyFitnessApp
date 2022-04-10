import axios from 'axios';
import { store } from '../store/initStore';
import { logOut } from '../store/actions/user';
<<<<<<< HEAD
import {
  gotApiError,
  gotStatusCode,
} from '../store/actions/globalAppStateAction';

=======
import { gotApiError } from '../store/actions/globalAppStateAction';
import { apiError } from '../store/selectors/globalAppState';
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
const fakeServerAPI = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

fakeServerAPI.interceptors.request.use(
  (request) => {
<<<<<<< HEAD
=======
    store.dispatch(gotApiError(''));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
    request.headers.acces = store.getState().userReduser.isLoggedIn;
    return request;
  },
  (error) => {
    store.dispatch(gotApiError(error.message));
<<<<<<< HEAD
    console.log(error.message, error.response);
=======
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  }
);

fakeServerAPI.interceptors.response.use(
  (responce) => {
<<<<<<< HEAD
=======
    store.dispatch(gotApiError(''));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
    return responce;
  },
  (error) => {
    if (error.code === 401) {
      store.dispatch(logOut());
<<<<<<< HEAD
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
=======
    } else if (error) {
      store.dispatch(gotApiError(error.message));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
      throw error;
    }
  }
);
export default fakeServerAPI;
