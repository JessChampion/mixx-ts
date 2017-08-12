import {SEARCH_RESULTS, SEARCH_SPOTIFY} from './actions';
import authReducer from './reducers';

describe('Search spotify reducer', () => {
  it('should set loading, and clear previous search results', () => {
    const action = {
      type: SEARCH_SPOTIFY
    };
    const result = authReducer({
      loading: false,
      searchResults: [{existing: 'data'}]
    }, action);
    console.log(result);
    expect(result.loading).toBeTruthy();
    expect(result.searchResults.length).toBe(0);
  });

  it('should set not loading assign data to search results', () => {
    const action = {
      data: [{id: 1}, {id: 2}],
      type: SEARCH_RESULTS
    };
    const result = authReducer({
      loading: true,
      searchResults: []
    }, action);
    console.log(result);
    expect(result.loading).toBeFalsy();
    expect(result.searchResults).toEqual(action.data);
  });
});
