import * as subject from './fetch';

let mockFetch;

const setup = (resonse: any, status: number = 200) => {
  const returnValue = {
    json: () => resonse,
    status
  };
  const p = new Promise((resolve) => resolve(returnValue));
  mockFetch = jest.spyOn(subject, '_fetch').mockReturnValue(p);
};

const testURL = 'http://test.com';
const testToken = 'TOKEN';
const testResponse = { test: {response: 2}};

describe('makeRequestWithToken', () => {
  it('should make a successful request', async () => {
    setup(testResponse);
    const result = await subject.makeRequestWithToken(testURL, testToken);
    expect(result).toEqual(testResponse);
  });

  it('should throw an error on an unsuccessful request', async () => {
    setup(testResponse, 404);
    let error;
    try {
      await subject.makeRequestWithToken(testURL, testToken);
    } catch (e){
      error = e;
    }
    expect(error).toEqual(new Error('Bad response from server: {"status":404}'));
  });
});
