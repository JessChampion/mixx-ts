import * as R from 'ramda';

import {ADD_SEED, LOAD_THUMBNAIL, REMOVE_SEED} from './actions';
import settingsReducer from './reducers';
const testTracks = [
  {id: 1234},
  {id: 2345},
  {id: 3456},
  {id: 4567},
  {id: 5678},
  {id: 5679}
];

describe('Add seed reducer', () => {
  it('should add first seed track', () => {
    const testTrack = testTracks[0];
    const action = {
      track: testTrack,
      type: ADD_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: []
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(1);
    expect(result.seeds[0]).toEqual(testTrack);
  });

  it('should add additional seed track', () => {
    const testTrack = testTracks[2];
    const action = {
      track: testTrack,
      type: ADD_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: [testTracks[0], testTracks[1]]
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(3);
    expect(result.seeds[2]).toEqual(testTrack);
  });

  it('should not add existing seed track', () => {
    const testTrack = testTracks[1];
    const action = {
      track: testTrack,
      type: ADD_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: [testTracks[0], testTracks[1]]
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(2);
  });

  it('should not seeds beyond the maximum', () => {
    const testTrack = testTracks[5];
    const action = {
      track: testTrack,
      type: ADD_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: R.dropLast(1, testTracks)
    }, action);
    expect(result.seedError).toEqual('MAX_5');
    expect(result.seeds.length).toBe(5);
    expect(R.contains(testTrack, result.seeds)).toBeFalsy();
  });
});

describe('Remove seed reducer', () => {
  it('should do nothing if there are no seeds', () => {
    const testTrack = testTracks[0];
    const action = {
      id: testTrack.id,
      type: REMOVE_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: []
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(0);
  });

  it('should remove the only seed', () => {
    const testTrack = testTracks[0];
    const action = {
      id: testTrack.id,
      type: REMOVE_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: [testTrack]
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(0);
  });

  it('should remove the relevant seed', () => {
    const testTrack = testTracks[1];
    const action = {
      id: testTrack.id,
      type: REMOVE_SEED
    };
    const result = settingsReducer({
      seedError: '',
      seeds: R.take(3, testTracks)
    }, action);
    const expected = [testTracks[0], testTracks[2]];
    expect(result.seedError).toEqual('');
    expect(result.seeds.length).toBe(2);
    expect(result.seeds).toEqual(expected);
  });

  it('should do nothing target is not in seeds', () => {
    const testTrack = testTracks[4];
    const action = {
      id: testTrack.id,
      type: REMOVE_SEED
    };
    const initialSeeds = R.take(3, testTracks);
    const result = settingsReducer({
      seedError: '',
      seeds: initialSeeds
    }, action);
    expect(result.seedError).toEqual('');
    expect(result.seeds).toEqual(initialSeeds);
  });

});

describe('Loaded thumbnail reducer', () => {
  it('should do nothing if their no seed with the given id', () => {
    const testTrack = testTracks[0];
    const action = {
      id: testTrack.id,
      imageUrl: 'some/url.img',
      type: LOAD_THUMBNAIL
    };
    const initialState = {
      seedError: '',
      seeds: [testTracks[1]]
    };
    const result = settingsReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should add the url to the correct seed', () => {
    const testTrack = testTracks[1];
    const action = {
      id: testTrack.id,
      imageUrl: 'some/url.img',
      type: LOAD_THUMBNAIL
    };
    const initialState = {
      seedError: '',
      seeds: R.take(3, testTracks)
    };
    const result = settingsReducer(initialState, action);
    expect(result.seeds[1]).toEqual({id: 2345, imageUrl: 'some/url.img'});
  });
});
