import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import {SEARCH_SPOTIFY} from './actions';
import SearchForm from './SearchForm';

const getTypeMatcher = R.propEq('type');
const findActionByType = R.useWith(R.find, [getTypeMatcher, R.identity]);

const mockStore = configureStore([]);

const setup = (store?: any) => {
  store = store ? store : mockStore();
  return mount(
    <Provider store={store}>
      <SearchForm/>
    </Provider>
  );
};

describe('Search Form', () => {
  it('renders without crashing', () => {
    const underTest = setup();
    const component = underTest.find('SearchFormComponent');
    expect(component.length).toBeGreaterThan(0);
  });

  it('sends toggleSection on toggleEvent', () => {
    const store = mockStore();
    const component = setup(store).find('SearchFormComponent');
    expect(component.length).toBe(1);
    const onSearch: any = component.prop('submitSearch');
    onSearch('testQuery');
    const action = findActionByType(SEARCH_SPOTIFY, store.getActions());
    expect(action).toEqual({type: SEARCH_SPOTIFY});
  });
});
