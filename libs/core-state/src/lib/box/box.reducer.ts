import { Box } from '@crossfit/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, State } from '@ngrx/store';

import * as BoxActions from './box.actions';

export interface BoxesAction extends Action {
  error: string;
}

export const BOX_FEATURE_KEY = 'box';

export interface BoxState extends EntityState<Box> {
  selectedId?: string | number; // which Box record has been selected
  loaded: boolean; // has the Box list been loaded
  error?: string | null; // last known error (if any)
}

export interface BoxPartialState {
  readonly [BOX_FEATURE_KEY]: BoxState;
}

export const boxAdapter: EntityAdapter<Box> = createEntityAdapter<Box>();

export const initialState: BoxState = boxAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: BoxState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: BoxState, { error }: BoxesAction) => ({
  ...state,
  error,
});

const _boxReducer = createReducer(
  initialState,
  on(
    BoxActions.loadBox,
    BoxActions.loadBoxes,
    BoxActions.createBox,
    BoxActions.updateBox,
    BoxActions.deleteBox,
    setLoading
  ),
  on(
    BoxActions.loadBoxFailure,
    BoxActions.loadBoxesFailure,
    BoxActions.createBoxFailure,
    BoxActions.updateBoxFailure,
    BoxActions.deleteBoxFailure,
    setFailure
  ),
  on(BoxActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(BoxActions.loadBoxesSuccess, (state, { boxes }) =>
    boxAdapter.setAll(boxes, { ...state, loaded: true })
  ),
  on(BoxActions.loadBoxFailure, (state, { error }) => ({ ...state, error })),
  on(BoxActions.loadBoxSuccess, (state, { box }) =>
    boxAdapter.upsertOne(box, { ...state, loaded: true })
  ),
  on(BoxActions.selectBox, (state, { boxId }) => ({
    ...state,
    selectedId: boxId,
  })),
  on(BoxActions.createBoxSuccess, (state, { box }) =>
    boxAdapter.addOne(box, { ...state, loaded: true })
  ),
  on(BoxActions.updateBoxSuccess, (state, { box: { id, ...restBox } }) =>
    boxAdapter.updateOne(
      { id, changes: { ...restBox } },
      { ...state, loaded: true }
    )
  ),
  on(BoxActions.deleteBoxSuccess, (state, { id }) =>
    boxAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function boxReducer(state: BoxState | undefined, action: Action) {
  return _boxReducer(state, action);
}
