import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as BoxActions from './box.actions';
import { BoxEffects } from './box.effects';

describe('BoxEffects', () => {
  let actions: Observable<Action>;
  let effects: BoxEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BoxEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BoxEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BoxActions.init() });

      const expected = hot('-a-|', {
        a: BoxActions.loadBoxSuccess({ box: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
