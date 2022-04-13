// https://github.com/erikras/ducks-modular-redux

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';

interface User {
  id: string;
  name: string;
  email: string;
}

interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'fitofit/user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = slice.actions;

// Selects
export const selectIsUserLoggedIn = (state: RootState): boolean =>
  state.user.isLoggedIn;

export default slice.reducer;
