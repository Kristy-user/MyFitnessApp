import { combineReducers } from 'redux';
import { userReduser } from './userReducer';
import { tasksReduser } from './tasksReduser';
import { exercisesReduser } from './exercisesReducer';
import { globalAppStateReduser } from './globalAppStateReducer';
import { goalsReduser } from './goalsReduser';
import { performanceReducer } from './performanceReducer';
const rootReducer = combineReducers({
  tasksReduser,
  exercisesReduser,
  userReduser,
  globalAppStateReduser,
  goalsReduser,
  performanceReducer,
});

export default rootReducer;
