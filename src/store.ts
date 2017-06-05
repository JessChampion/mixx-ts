import {combineReducers, createStore} from 'redux';
import mainReducer from './main/reducers';
import {loadStateFromStore, saveStateToStore} from './utils/LocalStorage';

const rootReducer = combineReducers({
  main: mainReducer
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