import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import {REMOVE_SEED} from '../settings/actions';
import Seeds from './Seeds';

const getTypeMatcher = R.propEq('type');
const findActionByType = R.useWith(R.find, [getTypeMatcher, R.identity]);

const mockStore = configureStore([]);

const setup = (store?: any) => {
  store = store ? store : mockStore();
  return mount(
    <Provider store={store}>
      <Seeds/>
    </Provider>
  );
};

describe('Search results', () => {
  it('renders without crashing', () => {
    const underTest = setup();
    const component = underTest.find('SeedsComponent');
    expect(component.length).toBeGreaterThan(0);
  });

  it('sends removeSeed on removeSeed EVENT', () => {
    const testSeeds = [{
      artist: 'test artist',
      id: 1234,
      name: 'test track',
    }];
    const store = mockStore();
    const component = setup(store).find('SeedsComponent');
    const removeSeed: any = component.prop('removeSeed');
    removeSeed(testSeeds[0].id);
    const action = findActionByType(REMOVE_SEED, store.getActions());
    expect(action).toEqual({type: REMOVE_SEED, id: testSeeds[0].id});
  });
});
