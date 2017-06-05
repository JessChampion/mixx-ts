import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import Main from './mainView';

const mockStore = configureStore([]);

const setup = (store?: any) => {
  store = store ? store : mockStore();
  return mount(
    <Provider store={store}>
      <Main/>
    </Provider>
  );
};

it('renders without crashing', () => {
  const underTest = setup();
  const main = underTest.find('Main');
  expect(main.length).toBeGreaterThan(0);
});

it('renders header', () => {
  const underTest = setup();
  const main = underTest.find('Main');
  expect(main.children().first().hasClass('headerBar')).toBeTruthy();
});

it('renders sections', () => {
  const underTest = setup();
  const sections = underTest.find('Section');
  expect(sections.length).toBeGreaterThan(0);
});
