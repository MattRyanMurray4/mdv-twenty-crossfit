import { Box } from '@crossfit/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Box Page] Init');

// all

export const loadBoxes = createAction('[Boxes] Load All Boxes');

export const loadBoxesSuccess = createAction(
  '[Boxes] Loaded Boxes Success',
  props<{ boxes: Box[] }>()
);

export const loadBoxesFailure = createAction(
  '[Boxes] Loaded Boxes Failure',
  props<{ error: any }>()
);

// singular

export const loadBox = createAction(
  '[Box] Load A Box',
  props<{ id: string }>()
);

export const loadBoxSuccess = createAction(
  '[Box] Loaded Box Success',
  props<{ box: Box }>()
);

export const loadBoxFailure = createAction(
  '[Box] Loaded Box Failure',
  props<{ error: any }>()
);

// select

export const selectBox = createAction(
  '[Box]  Selected A  object',
  props<{ boxId: string }>()
);

// create

export const createBox = createAction(
  '[Box] Create A Box',
  props<{ box: Box }>()
);

export const createBoxSuccess = createAction(
  '[Box] Created Box Success',
  props<{ box: Box }>()
);

export const createBoxFailure = createAction(
  '[Box] Created Box Failure',
  props<{ error: any }>()
);

// update

export const updateBox = createAction(
  '[Box] Update A Boz',
  props<{ box: Box }>()
);

export const updateBoxSuccess = createAction(
  '[Box] Updated Box Success',
  props<{ box: Box }>()
);

export const updateBoxFailure = createAction(
  '[Box] Updated Box Failure',
  props<{ error: any }>()
);

// delete

export const deleteBox = createAction(
  '[Box] Delete A Box',
  props<{ box: Box }>()
);

export const deleteBoxSuccess = createAction(
  '[Box] Deleted Box Success',
  props<{ id: string }>()
);

export const deleteBoxFailure = createAction(
  '[Box] Deleted Box Failure',
  props<{ error: any }>()
);
