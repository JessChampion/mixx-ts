declare const global: any;
import * as sinon from 'sinon';

import * as fetch from '../utils/fetch';
import {LOGIN, login} from './actions';
import {LOGGED_IN_WITH_SPOTIFY, loggedInWithSpotify} from './actions';
import {RECIEVED_USER, recievedUser} from './actions';

const locationSpy = sinon.spy();
const testLocation = '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login';
const testToken = 'BQCNLPOZ';

beforeEach(() => {
  locationSpy.reset();
  global.location.assign = locationSpy;
});

describe('Login action', () => {
  it('should generate the correct action type', () => {
    expect(login()).toEqual({type: LOGIN});
  });

  it('should redirect to the oauth url', () => {
    login();
    expect(locationSpy.callCount).toBe(1);
    login();
    expect(locationSpy.callCount).toBe(2);
  });
});

describe('Logged in action', () => {
  it('should generate the correct action', () => {
    const location = '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login';
    const result = loggedInWithSpotify(location, true);
    expect(result.type).toEqual(LOGGED_IN_WITH_SPOTIFY);
    expect(result.hasUser).toEqual(true);
    expect(result.token).toEqual(testToken);
    expect(result.expires).toEqual(expect.any(Number));
  });

  it('should not request user details if hasUser is true', () => {
    const mockFetch = jest.fn();
    fetch.makeRequestWithToken = mockFetch;
    loggedInWithSpotify(testLocation, true);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should request user details if hasUser is false', () => {
    const mockFetch = jest.fn();
    fetch.makeRequestWithToken = mockFetch;
    loggedInWithSpotify(testLocation, false);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), testToken);
  });
});

describe('Recieved user action', () => {
  it('login should generate the correct action', () => {
    const testUser = {id: 1};
    expect(recievedUser(testUser)).toEqual({type: RECIEVED_USER, user: testUser});
  });
});
