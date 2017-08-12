import * as R from 'ramda';
import store from '../store';
import {makeRequestWithToken} from '../utils/fetch';
import {parseTracksResult} from '../utils/spotifyParser';

const SEARCH = 'https://api.spotify.com/v1/search';

const getTracks = R.path(['tracks', 'items']);
const parseResults = R.compose(parseTracksResult, getTracks);

const getUrl = (query: string) => SEARCH + '?q=' + encodeURI(query) + '&type=track';

const searchResults = (data: any) => {
  return {
    data,
    type: SEARCH_RESULTS
  };
};

const doSpotifySearch = (query: string) => {
  const token = store.getState().auth.token;
  makeRequestWithToken(getUrl(query), token).then((data) => {
    data = parseResults(data);
    console.log('DATA: ' + JSON.stringify(data));
    store.dispatch(searchResults(data));
  });
};

export const SEARCH_SPOTIFY = 'SEARCH_SPOTIFY';
export function searchSpotify(query: string) {
  doSpotifySearch(query);
  return {
    type: SEARCH_SPOTIFY
  };
}

export const SEARCH_RESULTS = 'SEARCH_RESULTS';
