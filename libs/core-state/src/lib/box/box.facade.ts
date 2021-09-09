import { Injectable } from '@angular/core';
import { Box } from '@crossfit/api-interfaces';
import { Action, select, Store } from '@ngrx/store';
import * as BoxActions from './box.actions';
import * as BoxSelectors from './box.selectors';

@Injectable()
export class BoxFacade {
  loaded$ = this.store.pipe(select(BoxSelectors.getBoxLoaded));
  allBox$ = this.store.pipe(select(BoxSelectors.getAllBox));
  selectedBox$ = this.store.pipe(select(BoxSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(BoxActions.init());
  }

  loadBox(id: string) {
    return this.store.dispatch(BoxActions.loadBox({ id }));
  }

  loadBoxes() {
    return this.store.dispatch(BoxActions.loadBoxes());
  }

  selectBox(boxId: string) {
    return this.store.dispatch(BoxActions.selectBox({ boxId }));
  }

  createBox(box: Box) {
    return this.store.dispatch(BoxActions.createBox({ box }));
  }

  updateBox(box: Box) {
    return this.store.dispatch(BoxActions.updateBox({ box }));
  }

  deleteBox(box: Box) {
    return this.store.dispatch(BoxActions.deleteBox({ box }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
