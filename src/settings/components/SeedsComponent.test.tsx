import {shallow} from 'enzyme';
import * as R from 'ramda';
import * as React from 'react';

import SeedsComponent from './SeedsComponent';

describe('Search form component', () => {
  it('renders the empty message when no seeds are provided', () => {
    const component = shallow(
      <SeedsComponent seeds={[]} removeSeed={jest.fn()}/>
    );
    expect(component.find('.emptySeeds').length).toEqual(1);
  });

  it('renders an component for each seed', () => {
    const testSeeds = [{
      artist: 'test artist',
      id: 1234,
      name: 'test track',
    }, {
      artist: 'test artist 2',
      id: 2345,
      name: 'test track 2',
    }, {
      artist: 'test artist 3',
      id: 3456,
      name: 'test track 3',
    }];
    const component = shallow(
      <SeedsComponent seeds={testSeeds} removeSeed={jest.fn()}/>
    );
    expect(component.find('.seed .details').length).toEqual(testSeeds.length);
  });

  it('renders the image url if provided', () => {
    const testSeeds = [{
      artist: 'test artist',
      id: 1234,
      imageUrl: 'test/url.img',
      name: 'test track',
    }];
    const component = shallow(
      <SeedsComponent seeds={testSeeds} removeSeed={jest.fn()}/>
    );
    const backgroundImage = component.find('.seed').nodes[0].props.style.backgroundImage;
    expect(backgroundImage).toEqual('url('+testSeeds[0].imageUrl+')');
  });

  it('dispatches a removeSeed action when each track is clicked', () => {
    const testSeeds = [{
      artist: 'test artist',
      id: 1234,
      name: 'test track',
    }, {
      artist: 'test artist 2',
      id: 2345,
      name: 'test track 2',
    }, {
      artist: 'test artist 3',
      id: 3456,
      name: 'test track 3',
    }];
    const removeSeedMock = jest.fn();
    const component = shallow(
      <SeedsComponent seeds={testSeeds} removeSeed={removeSeedMock}/>
    );
    const results = component.find('.remove');
    expect(results.length).toEqual(testSeeds.length);
    results.map((result, index) => {
      result.simulate('click');
      expect(removeSeedMock).toHaveBeenCalledTimes(index + 1);
      const param: any = R.path(['mock', 'calls', index, 0])(removeSeedMock);
      expect(param).toEqual(testSeeds[index].id);
    });
  });

});