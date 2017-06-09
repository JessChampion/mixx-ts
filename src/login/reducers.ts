import * as R from 'ramda';

import {
  LOGGED_IN_WITH_SPOTIFY,
  RECIEVED_USER,
} from './actions';

const defaultState = {
  requesting: false,
  token: '',
  user: null
};

const setRequesting: any = R.assoc('requesting');
const setUser: any = R.compose(R.assoc('user') as any, R.prop('user'));
const getRequestingUser: any = R.compose(setRequesting, R.not, R.prop('hasUser'));
const getTokenDetails = R.pickAll(['expires', 'token']);
const getRequestingState = (state: any, action: any) => {
  return R.merge(
    getRequestingUser(action)(state),
    getTokenDetails(action));
};
const setUserState = (state: any, action: any) => {
  return R.compose(setRequesting(false), setUser(action))(state);
};

export interface IAuthState {
  requesting: boolean;
  token: string;
  user: any;
  expires?: number;
}

export default function authReducer(state: IAuthState = defaultState, action: any): IAuthState {
  switch (action.type) {
    case LOGGED_IN_WITH_SPOTIFY: {
      return getRequestingState(state, action) as IAuthState;
    }
    case RECIEVED_USER: {
      return setUserState(state, action) as IAuthState;
    }
  }
  return state;
}
