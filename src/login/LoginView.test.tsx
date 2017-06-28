import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import Login from './loginView';

const mockStore = configureStore([]);

const setup = () => {
  const store = mockStore({auth: {}});
  return mount(
    <Provider store={store}>
      <Login/>
    </Provider>
  );
};

describe('Login view', () => {
  it('renders without crashing', () => {
    const underTest = setup();
    const heading = underTest.find('h1');
    expect(heading.length).toBeGreaterThan(0);
  });

  it('renders a LoginForm', () => {
    const underTest = setup();
    const button = underTest.find('button');
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('Login with Spotify'); //rendered by leaf component: LoginFormComponent
  });
});
