import * as R from 'ramda';
import store from '../store';
import {makeRequest} from '../utils/Fetch';
import {parseTracksResult} from '../utils/SpotifyParser';

const SEARCH = 'https://api.spotify.com/v1/search';

const getTracks = R.path(['tracks', 'items']);
const parseResults = R.compose(parseTracksResult, getTracks);

const getUrl = (query: string) => SEARCH + '?q=' + encodeURI(query) + '&type=track';
const search = R.compose(makeRequest, getUrl);

const doSpotifySearch = (query: string) => {
  search(query).then((data) => {
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
export function searchResults(data: any) {
  return {
    data,
    type: SEARCH_RESULTS
  };
}
