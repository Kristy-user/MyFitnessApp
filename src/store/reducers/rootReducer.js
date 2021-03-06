import { combineReducers } from 'redux';
import { userReduser } from './userReducer';
import { tasksReduser } from './tasksReduser';
import { exercisesReduser } from './exercisesReducer';
import { globalAppStateReduser } from './globalAppStateReducer';
import { goalsReduser } from './goalsReduser';
import { analyticsReducer } from './analyticsReducer';
import { userPersonalDataReduser } from './userPersonalDataReduser';
import { todayAnalyticsReducer } from './todayAnalyticsReducer';

const rootReducer = combineReducers({
  tasksReduser,
  exercisesReduser,
  userReduser,
  globalAppStateReduser,
  goalsReduser,
  analyticsReducer,
  todayAnalyticsReducer,
  userPersonalDataReduser,
});

export default rootReducer;
