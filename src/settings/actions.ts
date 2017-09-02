import * as R from 'ramda';
import store from '../store';

import {makeRequestWithToken} from '../utils/fetch';

const getByHeight: any = R.filter(R.propEq('height', 300));
const getThumbnail = R.compose(R.head, getByHeight, R.pathOr([], ['album', 'images']));
const parseThumbnailResults = (response: any) => R.compose(R.prop('url'), getThumbnail)(response);
const requestThumbnail = async (url: string) => {
  const token = store.getState().auth.token;
  const data = await makeRequestWithToken(url, token);
  return parseThumbnailResults(data);
};

export const ADD_SEED = 'ADD_SEED';

export function addSeed(track: any) {
  loadThumbnail(track.id, track.href).then((action) => {
    store.dispatch(action);
  });
  return {
    track,
    type: ADD_SEED
  };
}

export const REMOVE_SEED = 'REMOVE_SEED';

export function removeSeed(id: any) {
  return {
    id,
    type: REMOVE_SEED
  };
}

export const LOAD_THUMBNAIL = 'LOAD_THUMBNAIL';

export async function loadThumbnail(id: number, href: any) {
  const imageUrl = await requestThumbnail(href);
  return {
    id,
    imageUrl,
    type: LOAD_THUMBNAIL
  };
}

// export const CREATE_MIX = 'CREATE_MIX';
// export function createMix() {
//   return {
//     type: CREATE_MIX
//   };
// }
