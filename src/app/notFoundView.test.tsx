import * as React from 'react';

import {shallow} from 'enzyme';

import NotFoundView from './notFoundView';

describe('Not found view', () => {

  it('supplies the store through a provider', () => {
    const component = shallow(
      <NotFoundView/>
    );
    const title = component.find('h3');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Page not found');
  });
});