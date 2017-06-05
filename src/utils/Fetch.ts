import * as fetch from 'isomorphic-fetch';

export async function makeRequest(url: string) {
  const response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  return await response.json();
}
