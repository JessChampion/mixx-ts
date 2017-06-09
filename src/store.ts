import {combineReducers, createStore} from 'redux';
import authReducer from './login/reducers';
import mainReducer from './main/reducers';
import searchReducer from './search/reducers';
import {loadStateFromStore, saveStateToStore} from './utils/localStorage';

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  search: searchReducer
});

const initialState = loadStateFromStore() || {};

const store = createStore(
  rootReducer,
  initialState
);

store.subscribe(() => {
  // Log the state whenever the store changes.
  const state = store.getState();
  console.log(state);
  saveStateToStore(state);
});

export default store;
