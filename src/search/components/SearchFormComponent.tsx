import * as React from 'react';

import './searchForm.css';

export interface ISearchFormComponentProps {
  submitSearch: any;
}

export default class SearchFormComponent extends React.Component<ISearchFormComponentProps, any> {

  render() {
    const submitSearch = this.props.submitSearch;
    return (
      <div className="searchForm">
        <input className="searchBox"
               type="text"
               placeholder="Add seed tracks"
               name="searchQuery"
        />
        <button className="searchButton" onClick={(evt) => submitSearch(evt)}>Search</button>
      </div>
    );
  }
}
