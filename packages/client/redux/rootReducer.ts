import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '~/redux/ducks/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
