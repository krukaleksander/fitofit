import { combineReducers } from '@reduxjs/toolkit';
import userActivitiesReducer from '~/redux/ducks/userActivities';
import userReducer from '~/redux/ducks/user';

const rootReducer = combineReducers({
  user: userReducer,
  userActivities: userActivitiesReducer,
});

export default rootReducer;
