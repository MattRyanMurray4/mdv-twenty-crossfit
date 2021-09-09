import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as BoxActions from './box.actions';
import { BoxEffects } from './box.effects';
import { BoxFacade } from './box.facade';
import { BoxEntity } from './box.models';
import { BOX_FEATURE_KEY, State, initialState, reducer } from './box.reducer';
import * as BoxSelectors from './box.selectors';

interface TestSchema {
  box: State;
}

describe('BoxFacade', () => {
  let facade: BoxFacade;
  let store: Store<TestSchema>;
  const createBoxEntity = (id: string, name = ''): BoxEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOX_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BoxEffects]),
        ],
        providers: [BoxFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BoxFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allBox$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allBox$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadBoxSuccess` to manually update list
     */
    it('allBox$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allBox$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        BoxActions.loadBoxSuccess({
          box: [createBoxEntity('AAA'), createBoxEntity('BBB')],
        })
      );

      list = await readFirst(facade.allBox$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
