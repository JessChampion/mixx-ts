export const ADD_SEED = 'ADD_SEED';
export function addSeed(track: any) {
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

// export const LOADED_THUMBNAIL = 'LOADED_THUMBNAIL';
// export function loadedThumbnail(id: number, imageUrl: any) {
//   return {
//     id,
//     imageUrl,
//     type: LOADED_THUMBNAIL
//   };
// }
//
// export const CREATE_MIX = 'CREATE_MIX';
// export function createMix() {
//   return {
//     type: CREATE_MIX
//   };
// }
