import * as R from 'ramda';
import store from '../store';
import {makeRequestWithToken} from '../utils/fetch';

const CLIENT = 'dc741732cf0245dea66f6d4a47a65f06';
const AUTH = 'https://accounts.spotify.com/authorize';
const USER = 'https://api.spotify.com/v1/me';
const BASE = 'http://localhost:3000/';
const REDIRECT = 'login#';
const SCOPES = 'user-read-private playlist-modify-public playlist-modify-private';
// const checkExprity = (expires: number) => expires > Date.now();
const getExpiryFrom = (offset: string) => Date.now() + parseInt(offset, 10);
const removeHash = (str: string) => str.substring(1);
const splitByAnd = R.split('&');
const splitByEquals = R.map(R.split('='));
const flatten = R.map((item: string[]) => {
  return R.set(R.lensProp(item[0]), item[1], {});
});

const splitParams = R.compose(R.mergeAll, flatten, splitByEquals, splitByAnd, removeHash);
const joinParams = R.join('&');

const getLoginURL = () => {
  // 'user-library-read user-read-private'
  // let scopes = 'scope=' + encodeURIComponent('user-library-read');
  const params = joinParams([
    ('client_id=' + CLIENT),
    'scope=' + SCOPES,
    'response_type=token',
    'state=login',
    'redirect_uri=' + BASE + REDIRECT
  ]);
  return AUTH + '?' + encodeURI(params);
};

const doLogin = () => {
  console.log('Redirect to login with spotify');
  window.location.assign(getLoginURL());
};

const getCurrentUserDetails = async (token: string) => {
  const data = await makeRequestWithToken(USER, token);
  store.dispatch(recievedUser(data));
};

const loggedIn = (params: string) => {
  const response: any = splitParams(params);
  const token: string = response.access_token;
  const expires: number = getExpiryFrom(response.expires_in);
  return {
    expires,
    token
  };
};

export const LOGIN = 'LOGIN';
export function login() {
  doLogin();
  return {
    type: LOGIN
  };
}

export const LOGGED_IN_WITH_SPOTIFY = 'LOGGED_IN_WITH_SPOTIFY';
export function loggedInWithSpotify(location: string, hasUser: boolean) {
  const {token, expires} = loggedIn(location);
  if (!hasUser) {
    getCurrentUserDetails(token); // TODO is there a nicer way to do this than using timeout
  }
  // if no user then getCurrentUserDetails
  return {
    expires,
    hasUser,
    token,
    type: LOGGED_IN_WITH_SPOTIFY
  };
}

export const RECIEVED_USER = 'RECIEVED_USER';
export function recievedUser(user: any) {
  return {
    type: RECIEVED_USER,
    user
  };
}