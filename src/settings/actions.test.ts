import {ADD_SEED, addSeed} from './actions';
import {REMOVE_SEED, removeSeed} from './actions';

// const testData = {tracks: {
//   items: [
//     {
//       artists: [
//         {name: 'test artist'}
//       ],
//       exclude: 'this',
//       href: 'http://test',
//       id: 1,
//       name: 'test track',
//       uri: 'ab1234',
//     }
//   ]
// }};

const testTrack = {id: 1234};

describe('Add seed action', () => {
  it('should generate the correct action type', () => {
    expect(addSeed(testTrack)).toEqual({track: testTrack, type: ADD_SEED});
  });
});

describe('Remove seed action', () => {
  it('should generate the correct action type', () => {
    expect(removeSeed(testTrack.id)).toEqual({id: testTrack.id, type: REMOVE_SEED});
  });
});
