import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadBox,
  loadBoxFailure,
  loadBoxSuccess,
  loadBoxes,
  loadBoxesFailure,
  loadBoxesSuccess,
  createBox,
  createBoxFailure,
  createBoxSuccess,
  updateBox,
  updateBoxFailure,
  updateBoxSuccess,
  deleteBox,
  deleteBoxFailure,
  deleteBoxSuccess,
} from './box.actions';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  BoxService,
  getActionType,
  NotifyService,
} from '@crossfit/core-data';
import * as BoxActions from './box.actions';

@Injectable()
export class BoxEffects {
  loadBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBox),
      switchMap(({ id }) =>
        this.boxService.find(id).pipe(
          map((box) => loadBoxSuccess({ box })),
          catchError((error) => of(loadBoxFailure({ error })))
        )
      )
    )
  );

  loadBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoxes),
      switchMap(() =>
        this.boxService.all().pipe(
          map((boxes) => loadBoxesSuccess({ boxes })),
          catchError((error) => of(loadBoxesFailure({ error })))
        )
      )
    )
  );

  createBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBox),
      switchMap(({ box }) =>
        this.boxService.create(box).pipe(
          map((box) => createBoxSuccess({ box })),
          catchError((error) => of(createBoxFailure({ error })))
        )
      )
    )
  );

  updateBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBox),
      switchMap(({ box }) =>
        this.boxService.update(box).pipe(
          map((box) => updateBoxSuccess({ box })),
          catchError((error) => of(updateBoxFailure({ error })))
        )
      )
    )
  );

  deleteBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBox),
      switchMap(({ box }) =>
        this.boxService.delete(box.id).pipe(
          map((id) => deleteBoxSuccess({ id })),
          catchError((error) => of(deleteBoxFailure({ error })))
        )
      )
    )
  );

  boxSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateBoxSuccess, createBoxSuccess, deleteBoxSuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Box ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  boxFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateBoxFailure, createBoxFailure, deleteBoxFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Box. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private boxService: BoxService,
    private notify: NotifyService
  ) {}
}
