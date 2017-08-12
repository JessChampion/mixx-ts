import * as R from 'ramda';

import {ADD_SEED} from './actions';
import {REMOVE_SEED} from './actions';

export interface ISettingsState {
  seeds: any[];
  seedError: string;
}

const defaultState = {
  seedError: '',
  seeds: []
};

const MAX_SEEDS = 5;
// const MIN_POPULARITY = 50;
// const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations?';
// const KEYS = {
//   POPULARITY: '&min_popularity=',
//   SEEDS: 'seed_tracks='
// };

const findIndexById = R.curry((id: string, seeds: any[]) => {
  return R.findIndex(R.propEq('id', id))(seeds);
});
const hasSeed = (id: string, seeds: any[]) => {
  return findIndexById(id, seeds) >= 0;
};
const addSeed = (state: any, action: any) => {
  if (state.seeds.length < MAX_SEEDS) {
    const seed = action.track;
    if (hasSeed(seed.id, state.seeds) === false) {
      return {
        seedError: '',
        seeds: R.append(seed, state.seeds)
      };
    }
    return {
      seedError: '',
      seeds: R.prop('seeds')(state)
    };
  }
  return R.assoc('seedError', ('MAX_' + MAX_SEEDS))(state);
};
const removeById = (id: string) => R.reject(R.propEq('id', id));
const removeSeed = (state: any, action: any) => {
  return {
    seedError: '',
    seeds: removeById(action.id)(state.seeds)
  };
};

const settingsReducer = (state: ISettingsState = defaultState, action: any): ISettingsState => {
  switch (action.type) {
    case ADD_SEED: {
      return addSeed(state, action);
    }
    case REMOVE_SEED: {
      return removeSeed(state, action);
    }
  }
  return state;
};

export default settingsReducer;
