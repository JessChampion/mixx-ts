import * as React from 'react';
import {shallow} from 'enzyme';

import LoginFormComponent from './LoginFormComponent';

describe('Login form component', () => {
  it('renders the login form', () => {
    const component = shallow(
      <LoginFormComponent loginWithSpotify="()=> 'hi'"/>
    );
    const button = component.find('button');
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('Login with Spotify');
  });

  it('dispatches a login action when the button is pressed', () => {
    const mockEventHandler = jest.fn();
    const component = shallow(
      <LoginFormComponent loginWithSpotify={mockEventHandler}/>
    );
    const button = component.find('button');
    button.simulate('click');
    expect(mockEventHandler).toHaveBeenCalled();
  });
});