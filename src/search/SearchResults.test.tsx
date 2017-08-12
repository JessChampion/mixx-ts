// import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import SearchResults from './SearchResults';

// const getTypeMatcher = R.propEq('type');
// const findActionByType = R.useWith(R.find, [getTypeMatcher, R.identity]);

const mockStore = configureStore([]);

const setup = (store?: any) => {
  store = store ? store : mockStore();
  return mount(
    <Provider store={store}>
      <SearchResults/>
    </Provider>
  );
};

describe('Search results', () => {
  it('renders without crashing', () => {
    const underTest = setup();
    const component = underTest.find('SearchResultsComponent');
    expect(component.length).toBeGreaterThan(0);
  });

  // it('sends addSeed on addSeedTrack', () => {
  //   const testTrack = {id: 1};
  //   const store = mockStore();
  //   const component = setup(store).find('SearchFormComponent');
  //   expect(component.length).toBe(1);
  //   const addSeedTrack: any = component.prop('addSeedTrack');
  //   addSeedTrack(testTrack);
  //   const action = findActionByType(ADD_SEED_TRACK, store.getActions());
  //   expect(action).toEqual({type: ADD_SEED_TRACK});
  // });
});
