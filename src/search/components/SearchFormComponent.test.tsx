import {shallow} from 'enzyme';
import * as React from 'react';

import SearchFormComponent from './SearchFormComponent';

describe('Search form component', () => {
  it('renders the search form', () => {
    const component = shallow(
      <SearchFormComponent submitSearch={jest.fn()}/>
    );
    const searchBox = component.find('input');
    expect(searchBox.length).toEqual(1);
    expect(searchBox.hasClass('searchBox')).toBeTruthy();
    const button = component.find('button');
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('Search');
  });

  it('accepts user input', () => {
    const mockEventHandler = jest.fn();
    const component = shallow(
      <SearchFormComponent submitSearch={mockEventHandler}/>
    );
    expect(component.state().query).toEqual('');
    const searchBox = component.find('input');
    const searchTerm = 'search term';
    searchBox.simulate('change', {target: {value: searchTerm}});
    expect(component.state().query).toEqual(searchTerm);
  });

  it('dispatches a search action when the button is pressed', () => {
    const mockEventHandler = jest.fn();
    const component = shallow(
      <SearchFormComponent submitSearch={mockEventHandler}/>
    );
    const searchTerm = 'search term';
    component.setState({query: searchTerm});
    const button = component.find('button');
    button.simulate('click', {
      preventDefault: () => {
      }
    });
    expect(mockEventHandler).toHaveBeenCalled();
    expect(mockEventHandler).toHaveBeenCalledWith(searchTerm);
  });
});
})
;