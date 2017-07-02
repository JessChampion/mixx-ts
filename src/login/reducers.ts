import * as R from 'ramda';

import {
  LOGGED_IN_WITH_SPOTIFY,
  LOGIN_RECIEVED,
} from './actions';

export interface IAuthState {
  requesting: boolean;
  token: string;
  user: any;
  expires?: number;
}

export interface ITokenState {
  token: string;
  expires: number;
}

const defaultState = {
  requesting: false,
  token: '',
  user: null
};

const hasUser = R.compose(R.has('user'), R.prop('payload'));
const getTokenDetails = R.compose(R.pickAll(['expires', 'token']), R.prop('payload'));
const setLoggedinState = (state: any, action: any) => {
  const spec = {
    requesting: R.F,
    user: R.ifElse(hasUser, R.path(['payload', 'user']), R.always(R.prop('user')(state)))
  };
  return R.converge(R.merge, [R.applySpec(spec), getTokenDetails])(action) as IAuthState;
};

// const state = "{\"requesting\":false,\"token\":\"\",\"user\":null}";
// const action = {"hasUser":false,"type":"LOGIN_RECIEVED"};

const getHasUser = R.prop('hasUser');
const isRequesting = (action: any) => R.compose(R.not, getHasUser)(action);
const setRequestingState = (state: IAuthState, action: any) => {
  return R.assoc('requesting', isRequesting(action))(state);
};

export default function authReducer(state: IAuthState = defaultState, action: any): IAuthState {
  console.log(action); // { hasUser: false, type: 'LOGIN_RECIEVED' }
  switch (action.type) {
    case LOGGED_IN_WITH_SPOTIFY: {
      return setLoggedinState(state, action);
    }
    case LOGIN_RECIEVED: {
      return setRequestingState(state, action);
    }
  }
  return state;
}
