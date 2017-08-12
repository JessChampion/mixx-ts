import {parseTracksResult} from './spotifyParser';

describe('parseTracksResult', () => {
  it('correctly parse empty track results', () => {
    const testTracks: any[] = [];
    const result = parseTracksResult(testTracks);
    expect(result).toEqual(testTracks);
  });

  it('correctly parse track results', () => {
    const testTracks: any[] = [
      {
        artists: [
          {name: 'test artist'}
        ],
        exclude: 'this',
        href: 'http://test',
        id: 1,
        name: 'test track',
        uri: 'ab1234',
      },
      {
        artists: [
          {name: 'test artist 2'},
          {name: 'test artist 3'}
        ],
        exclude: 'this',
        href: 'http://test2',
        id: 2,
        name: 'test track 2',
        uri: 'cd9876',
      }
    ];
    const expectedData = [{
      artist: 'test artist',
      href: 'http://test',
      id: 1,
      name: 'test track',
      uri: 'ab1234',
    }, {
      artist: 'test artist 2',
      href: 'http://test2',
      id: 2,
      name: 'test track 2',
      uri: 'cd9876',
    }];
    const result = parseTracksResult(testTracks);
    expect(result).toEqual(expectedData);
  });
});
