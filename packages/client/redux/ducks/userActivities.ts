// https://github.com/erikras/ducks-modular-redux

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';
import { IUserActivities, IUserActivity } from 'common';
import config from '~/config';

// usage: dispatch(fetchUserActivities())
export const fetchUserAllActivities = createAsyncThunk(
  'fitofit/fetchUserActivities',
  async () => {
    const res = await fetch(`${config.apiUrl}/exercises/user/activity`);
    return res.json();
  },
);

export const addExercise = createAsyncThunk(
  'fitofit/addExercise',
  async (activity: IUserActivity) => {
    const res = await fetch(`${config.apiUrl}/exercises/user/activity`);
    return res.json();
  },
);

// ================================================================

interface State extends IUserActivities {
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  totalDuration: 0,
  totalCalories: 0,
  caloriesToBurgers: 0,
  activities: [],

  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'fitofit/userActivities',
  initialState,
  reducers: {
    addActivity(state, action: PayloadAction<IUserActivity>) {
      state.activities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAllActivities.fulfilled, (state, action) => {
      state.activities.push(action.payload);
    });
  },
});

export const { addActivity } = slice.actions;

// Selects
export const selectTotalDuration = (state: RootState): number =>
  state.userActivities.totalDuration;
export const selectTotalCalories = (state: RootState): number =>
  state.userActivities.totalCalories;
export const selectCaloriesToBurgers = (state: RootState): number =>
  state.userActivities.caloriesToBurgers;
export const selectActivities = (state: RootState): Array<IUserActivity> =>
  state.userActivities.activities;

export default slice.reducer;
