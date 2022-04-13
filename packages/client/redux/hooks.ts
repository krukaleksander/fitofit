import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '~/redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<RootState, any, AnyAction> =>
  useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
