import { BoxEntity } from './box.models';
import { boxAdapter, BoxPartialState, initialState } from './box.reducer';
import * as BoxSelectors from './box.selectors';

describe('Box Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBoxId = (it: BoxEntity) => it.id;
  const createBoxEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BoxEntity);

  let state: BoxPartialState;

  beforeEach(() => {
    state = {
      box: boxAdapter.setAll(
        [
          createBoxEntity('PRODUCT-AAA'),
          createBoxEntity('PRODUCT-BBB'),
          createBoxEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Box Selectors', () => {
    it('getAllBox() should return the list of Box', () => {
      const results = BoxSelectors.getAllBox(state);
      const selId = getBoxId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BoxSelectors.getSelected(state) as BoxEntity;
      const selId = getBoxId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getBoxLoaded() should return the current "loaded" status', () => {
      const result = BoxSelectors.getBoxLoaded(state);

      expect(result).toBe(true);
    });

    it('getBoxError() should return the current "error" state', () => {
      const result = BoxSelectors.getBoxError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
