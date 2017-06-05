import {SEARCH_RESULTS, SEARCH_SPOTIFY} from './actions';

export interface ISearchState {
  loading: boolean;
  searchResults: any;
}
const defaultState = {
  loading: false,
  searchResults: []
};

const searchReducer = (state: ISearchState = defaultState, action: any): ISearchState => {
  switch (action.type) {
    case SEARCH_SPOTIFY: {
      return {
        loading: true,
        searchResults: []
      };
    }
    case SEARCH_RESULTS: {
      return {
        loading: false,
        searchResults: action.data
      };
    }
  }
  return state;
};

export default searchReducer;
