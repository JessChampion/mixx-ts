import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import LoginForm from './LoginForm';
import {LOGGED_IN_WITH_SPOTIFY, LOGIN} from '../actions';

const getActions = R.compose(R.call, R.path(['node', 'store', 'getActions']));
const mockStore = configureStore([]);
const defaultProps = {
  history: [],
  location: {hash: ''}
};
const defaultState = {
  auth: {
    hasUser: false,
    token: 'testToken1'
  }
};
const setup = (props: any = defaultProps, initialState: any = defaultState) => {
  const mockedStore: any = mockStore(initialState);
  return mount(
    <Provider store={mockedStore}>
      <LoginForm history={props.history} location={props.location}/>
    </Provider>
  );
};

describe('Login form', () => {
  it('renders login form', () => {
    const underTest = setup();
    const LoginFormComponent = underTest.find('LoginFormComponent');
    expect(LoginFormComponent.length).toBe(1);
  });

  it('dispatches a login action when the button is pressed', () => {
    const underTest = setup();
    const LoginFormComponent = underTest.find('LoginFormComponent');
    let actions = getActions(underTest);
    expect(actions.length).toBe(0);
    LoginFormComponent.props().loginWithSpotify();
    actions = getActions(underTest);
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(LOGIN);
  });

  it('dispatches a logged in event if url contains a token', () => {
    const testProps = {
      history: [],
      location: {hash: '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login'}
    };
    const testInitialState = {
      auth: {
        token: '',
        user: {id: 1}
      }
    };
    const underTest = setup(testProps, testInitialState);
    const actions = getActions(underTest);
    console.log(actions);
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(LOGGED_IN_WITH_SPOTIFY);
    expect(actions[0].token).toBe('BQCNLPOZ');
    expect(actions[0].hasUser).toBe(true);
  });
});
