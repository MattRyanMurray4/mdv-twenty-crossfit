import { Action } from '@ngrx/store';

import * as BoxActions from './box.actions';
import { BoxEntity } from './box.models';
import { State, initialState, reducer } from './box.reducer';

describe('Box Reducer', () => {
  const createBoxEntity = (id: string, name = ''): BoxEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Box actions', () => {
    it('loadBoxSuccess should return the list of known Box', () => {
      const box = [
        createBoxEntity('PRODUCT-AAA'),
        createBoxEntity('PRODUCT-zzz'),
      ];
      const action = BoxActions.loadBoxSuccess({ box });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
