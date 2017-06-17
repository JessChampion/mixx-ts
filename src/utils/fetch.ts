import * as fetch from 'isomorphic-fetch';

export async function makeRequest(url: string) {
  const response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  return await response.json();
}

export async function makeAuthenticatedRequest(url: string, token: string) {
  const request = new Request(url, {
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
  });
  const response: any = await fetch(request);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server: ' + JSON.stringify(response));
  }
  return await response.json();
}
