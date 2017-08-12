import * as fetch from 'isomorphic-fetch';

export const _fetch = async (request: Request) => {
  return fetch(request);
};

export async function makeRequestWithToken(url: string, token: string) {
  const request = new Request(url, {
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
  });
  const response: any = await _fetch(request);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server: ' + JSON.stringify(response));
  }
  return await response.json();
}
