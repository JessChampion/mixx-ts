import {LOGGED_IN_WITH_SPOTIFY, LOGIN_RECIEVED} from './actions';
import authReducer from './reducers';

describe('Login recieved reducer', () => {
  it('set requesting value correctly when hasUser is false', () => {
    const action = {
      hasUser: false,
      type: LOGIN_RECIEVED
    };
    const result = authReducer({
      requesting: false,
      token: '',
      user: null
    }, action);
    console.log(result);
    expect(result.requesting).toBeTruthy();
  });

  it('set requesting value correctly when hasUser is true', () => {
    const action = {
      hasUser: true,
      type: LOGIN_RECIEVED
    };
    const testUser = {id: 1};
    const result = authReducer({
      requesting: false,
      token: '1234',
      user: testUser
    }, action);
    expect(result.requesting).toBeFalsy();
    expect(result.token).toEqual('1234');
    expect(result.user).toEqual(testUser);
  });
});

describe('Logged in reducer', () => {
  // const ex = {
  //   payload: {
  //     expires: 1498963170516,
  //     token: 'BQDfXiSkK6tyTYcpAjQ3CLObxTeAVExt0ZJxs1qldYxWCdHYAnazcwBu',
  //     user: {
  //       country: 'NZ',
  //       display_name: 'Jess Champion',
  //     }
  //   },
  //   type: 'LOGGED_IN_WITH_SPOTIFY'
  // };
  it('sets token and expires and requesting values correctly when no user is supplied', () => {
    const action = {
      payload: {
        expires: 1234,
        token: '1234',
      },
      type: LOGGED_IN_WITH_SPOTIFY,
    };
    const result = authReducer({
      requesting: false,
      token: 'old',
      user: {id: 1}
    }, action);
    console.log(result);
    expect(result.requesting).toBeFalsy();
    expect(result.token).toEqual('1234');
    expect(result.expires).toEqual(1234);
    expect(result.user.id).toEqual(1);
  });

  it('sets token and expires and requesting values correctly when no user is supplied', () => {
    const action = {
      payload: {
        expires: 1234,
        token: '1234',
        user: {id: 2}
      },
      type: LOGGED_IN_WITH_SPOTIFY
    };
    const result = authReducer({
      requesting: false,
      token: 'old',
      user: {id: 1}
    }, action);
    console.log(result);
    expect(result.requesting).toBeFalsy();
    expect(result.token).toEqual('1234');
    expect(result.expires).toEqual(1234);
    expect(result.user.id).toEqual(2);
  });
});

