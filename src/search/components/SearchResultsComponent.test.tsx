import {shallow} from 'enzyme';
import * as R from 'ramda';
import * as React from 'react';

import SearchResultsComponent from './SearchResultsComponent';

describe('Search form component', () => {
  it('renders the loading container when loading is true', () => {
    const component = shallow(
      <SearchResultsComponent loading={true} data={[]} addSeedTrack={jest.fn()}/>
    );
    expect(component.find('.searchResults').length).toEqual(1);
    expect(component.find('.resultsHolder').length).toEqual(1);
    expect(component.find('.loadingIndicator').length).toEqual(1);
  });

  it('renders the results container when loading is false', () => {
    const testData = [{name: 'test', artist: 'data'}];
    const component = shallow(
      <SearchResultsComponent loading={false} data={testData} addSeedTrack={jest.fn()}/>
    );
    expect(component.find('.searchResults').length).toEqual(1);
    expect(component.find('.resultsHolder').length).toEqual(1);
    expect(component.find('.loadingIndicator').length).toEqual(0);
  });

  it('renders the results provided', () => {
    const testData = [
      {name: 'test', artist: 'data'},
      {name: 'testing', artist: 'data'},
      {name: 'well', artist: 'tested'}
    ];
    const component = shallow(
      <SearchResultsComponent loading={false} data={testData} addSeedTrack={jest.fn()}/>
    );
    const results = component.find('.result');
    expect(component.find('.resultsHolder').length).toEqual(1);
    expect(results.length).toEqual(testData.length);
    results.map((result, index) => {
      expect(result.find('.track').text()).toEqual(testData[index].name);
      expect(result.find('.artist').text()).toEqual(testData[index].artist);
    });
  });

  it('dispatches a addSeedTrack action when each track is clicked', () => {
    const mockEventHandler = jest.fn();
    const testData = [
      {name: 'test', artist: 'data'},
      {name: 'testing', artist: 'data'},
      {name: 'well', artist: 'tested'}
    ];
    const component = shallow(
      <SearchResultsComponent loading={false} data={testData} addSeedTrack={mockEventHandler}/>
    );
    const results = component.find('.result');
    results.map((result, index) => {
      result.simulate('click');
      expect(mockEventHandler).toHaveBeenCalledTimes(index + 1);
      const params = R.path(['mock', 'calls', index, 0])(mockEventHandler);
      expect(params.name).toEqual(testData[index].name);
      expect(params.artist).toEqual(testData[index].artist);
    });
  });
});