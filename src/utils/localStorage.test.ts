declare const global: any;

import {loadStateFromStore, saveStateToStore, STORE_KEY} from './localStorage';

const testState = { auth: {token: 'TOKEN'}};

const getItemSpy = jest.fn().mockReturnValue(JSON.stringify(testState));
const setItemSpy = jest.fn();

beforeEach(() => {
  global.window.localStorage = {
    getItem: getItemSpy,
    setItem: setItemSpy
  };
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

describe('loadStateFromStore', () => {
  it('should loadStateFromStore', () => {
    const result = loadStateFromStore();
    expect(getItemSpy).toBeCalledWith(STORE_KEY);
    expect(result).toEqual(testState);
  });
});

describe('stringifyAndSave', () => {
  it('should stringifyAndSave', () => {
    saveStateToStore(testState);
    expect(setItemSpy).toBeCalledWith(STORE_KEY, JSON.stringify(testState));
  });
});