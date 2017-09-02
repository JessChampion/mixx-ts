import store from '../store';
import * as fetch from '../utils/fetch';

import {ADD_SEED, addSeed} from './actions';
import {LOAD_THUMBNAIL, loadThumbnail} from './actions';
import {REMOVE_SEED, removeSeed} from './actions';

const testTrack = {
  artists: [
    {name: 'test artist'}
  ],
  exclude: 'this',
  href: 'http://test',
  id: 1234,
  name: 'test track',
  uri: 'ab1234',
};
const testResponse = {
  album: {
    id: '0Kd2DBbWxHWsEH3E3IuUIe',
    images: [{
      height: 640, url: 'https://i.scdn.co/image/207c0dc7c1e2', width: 640
    }, {
      height: 300, url: 'https://i.scdn.co/image/e9f7df6cd719', width: 300
    }, {
      height: 64, url: 'https://i.scdn.co/image/2c7fd0e4827f', width: 64
    }],
  }
};
const testToken = 'TEST_TOKEN';
const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue({auth: {token: testToken}});
const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => null);
const mockFetch = jest.spyOn(fetch, 'makeRequestWithToken').mockReturnValue(testResponse);

beforeEach(() => {
  getStateSpy.mockClear();
  dispatchSpy.mockClear();
  mockFetch.mockClear();
  mockFetch.mockReturnValue(testResponse);
});

describe('Add seed action', () => {
  it('should generate the correct action type', () => {
    expect(addSeed(testTrack)).toEqual({track: testTrack, type: ADD_SEED});
  });

  it('should request thumbnail image', () => {
    mockFetch.mockReset();
    expect(addSeed(testTrack)).toEqual({track: testTrack, type: ADD_SEED});
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), testToken);
  });
});

describe('Remove seed action', () => {
  it('should generate the correct action type', () => {
    expect(removeSeed(testTrack.id)).toEqual({id: testTrack.id, type: REMOVE_SEED});
  });
});

describe('Load thumbnail action', () => {
  it('should generate the correct action type', async () => {
    const result = await loadThumbnail(testTrack.id, testTrack.href);
    expect(result).toEqual({type: LOAD_THUMBNAIL, id: testTrack.id, imageUrl: testResponse.album.images[1].url});
  });

  it('should request thumbnail image', async () => {
    const result = await loadThumbnail(testTrack.id, testTrack.href);
    expect(result).toEqual({type: LOAD_THUMBNAIL, id: testTrack.id, imageUrl: testResponse.album.images[1].url});
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toBeCalledWith(testTrack.href, testToken);
    expect(getStateSpy).toHaveBeenCalledTimes(1);
  });
});
