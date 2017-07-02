declare const global: any;
import * as fetch from '../utils/fetch';
import {LOGIN, login} from './actions';
import {LOGGED_IN_WITH_SPOTIFY, loggedInWithSpotify} from './actions';
import {LOGIN_RECIEVED, loginReceieved} from './actions';

const locationSpy = jest.fn();
const testLocation = '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login';
const testToken = 'BQCNLPOZ';
const testUser = {id: 1};

beforeEach(() => {
  locationSpy.mockReset();
  global.location.assign = locationSpy;
});

describe('Login action', () => {
  it('should generate the correct action type', () => {
    expect(login()).toEqual({type: LOGIN});
  });

  it('should redirect to the oauth url', () => {
    login();
    expect(locationSpy).toHaveBeenCalledTimes(1);
    login();
    expect(locationSpy).toHaveBeenCalledTimes(2);
  });
});

describe('Login received action', () => {
  it('should generate the correct action type when hasUser is true', () => {
    expect(loginReceieved(true)).toEqual({type: LOGIN_RECIEVED, hasUser: true});
  });

  it('should generate the correct action type when hasUser is false', () => {
    expect(loginReceieved(false)).toEqual({type: LOGIN_RECIEVED, hasUser: false});
  });
});

describe('Logged in action', () => {
  it('should generate the correct action if hasUser is true', async () => {
    const location = '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login';
    const result = await loggedInWithSpotify(location, true);
    expect(result.type).toEqual(LOGGED_IN_WITH_SPOTIFY);
    result.payload.then((resolved: any) => {
        expect(resolved.token).toEqual(testToken);
        expect(resolved.expires).toEqual(expect.any(Number));
      }
    );
  });

  it('should not request user details if hasUser is true', async () => {
    const mockFetch = jest.spyOn(fetch, 'makeRequestWithToken').mockReturnValue(testUser);
    await loggedInWithSpotify(testLocation, true);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should generate the correct action if hasUser is false', async () => {
    jest.spyOn(fetch, 'makeRequestWithToken').mockReturnValue(testUser);
    const location = '#access_token=BQCNLPOZ&token_type=Bearer&expires_in=3600&state=login';
    const result = await loggedInWithSpotify(location, false);
    expect(result.type).toEqual(LOGGED_IN_WITH_SPOTIFY);
    result.payload.then((resolved: any) => {
        expect(resolved.token).toEqual(testToken);
        expect(resolved.user).toEqual(testUser);
        expect(resolved.expires).toEqual(expect.any(Number));
      }
    );
  });

  it('should request user details if hasUser is false', async () => {
    const mockFetch = jest.spyOn(fetch, 'makeRequestWithToken').mockReturnValue(testUser);
    mockFetch.mockReset();
    await loggedInWithSpotify(testLocation, false);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), testToken);
  });
});
