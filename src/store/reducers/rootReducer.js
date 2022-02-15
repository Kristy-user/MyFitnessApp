import { combineReducers } from 'redux';

import { tasksReduser } from './tasksReduser';
import { exercisesReduser } from './exercisesReducer';
const rootReducer = combineReducers({
  tasksReduser,
  exercisesReduser,
});

export default rootReducer;
