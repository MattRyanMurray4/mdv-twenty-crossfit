import { ActionReducerMap } from '@ngrx/store';
import { boxReducer, BoxState, BOX_FEATURE_KEY } from './box/box.reducer';

export interface AppState {
  [BOX_FEATURE_KEY]: BoxState;
}

export const reducers: ActionReducerMap<AppState> = {
  [BOX_FEATURE_KEY]: boxReducer,
};
