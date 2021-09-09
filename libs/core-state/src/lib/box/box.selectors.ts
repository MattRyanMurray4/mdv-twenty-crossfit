import { Box, emptyBox } from '@crossfit/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOX_FEATURE_KEY, BoxState, boxAdapter } from './box.reducer';

// Lookup the 'Box' feature state managed by NgRx
export const getBoxState = createFeatureSelector<BoxState>(BOX_FEATURE_KEY);

const { selectAll, selectEntities } = boxAdapter.getSelectors();

export const getBoxLoaded = createSelector(
  getBoxState,
  (state: BoxState) => state.loaded
);

export const getBoxError = createSelector(
  getBoxState,
  (state: BoxState) => state.error
);

export const getAllBox = createSelector(getBoxState, (state: BoxState) =>
  selectAll(state)
);

export const getBoxEntities = createSelector(getBoxState, (state: BoxState) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getBoxState,
  (state: BoxState) => state.selectedId
);

export const getSelected = createSelector(
  getBoxEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyBox) as Box
);
