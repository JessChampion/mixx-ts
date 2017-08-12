declare const global: any;

import store from '../store';
import * as fetch from '../utils/fetch';

import {SEARCH_SPOTIFY, searchSpotify} from './actions';
import {SEARCH_RESULTS} from './actions';

const locationSpy = jest.fn();
const testData = {tracks: {
  items: [
    {
      artists: [
        {name: 'test artist'}
      ],
      exclude: 'this',
      href: 'http://test',
      id: 1,
      name: 'test track',
      uri: 'ab1234',
    }
  ]
}};
const testQuery = 'query string';
const testToken = 'TEST_TOKEN';

const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue({auth: {token: testToken}});
const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => null);
const mockFetch = jest.spyOn(fetch, 'makeRequestWithToken').mockReturnValue({
  then: (callback: (data: any) => void) => callback(testData)
});

beforeEach(() => {
  locationSpy.mockReset();
  global.location.assign = locationSpy;
  getStateSpy.mockClear();
  dispatchSpy.mockClear();
  mockFetch.mockClear();
});

describe('Search Spotify action', () => {
  it('should generate the correct action type', () => {
    expect(searchSpotify('queryString')).toEqual({type: SEARCH_SPOTIFY});
  });

  it('should make search request', () => {
    const expectedQuery = 'https://api.spotify.com/v1/search?q=query%20string&type=track';
    searchSpotify(testQuery);
    expect(getStateSpy).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toBeCalledWith(expectedQuery, testToken);
  });

  it('should dispatch search results action with received data', () => {
    const expectedData = [{
      artist: 'test artist',
      href: 'http://test',
      id: 1,
      name: 'test track',
      uri: 'ab1234',
    }];
    searchSpotify(testQuery);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toBeCalledWith({type: SEARCH_RESULTS, data: expectedData});
  });
});