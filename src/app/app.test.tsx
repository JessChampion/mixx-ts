import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {shallow} from 'enzyme';

import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('supplies the store through a provider', () => {
  const app = shallow(
    <App/>
  );
  const provider = app.find('Provider');
  expect(provider.length).toEqual(1);
  expect(provider.prop('store')).toBeDefined();
});

it('create the router and routs', () => {
  const app = shallow(
    <App/>
  );
  const router = app.find('Router');
  expect(router.length).toEqual(1);
  expect(router.prop('history')).toBeDefined();

  const routes = app.find('Route');
  expect(routes.length).toBeGreaterThan(1);
});
