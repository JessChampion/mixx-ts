import * as React from 'react';

import './searchForm.css';

export interface ISearchFormComponentProps {
  submitSearch: any;
}

export default class SearchFormComponent extends React.Component<ISearchFormComponentProps, any> {

  constructor(props: any) {
    super(props);
    if (!this.state) {
      this.state = {query: ''};
    }
  }

  handleChange(event: any) {
    this.setState({query: event.target.value});
  }

  handleSearch(event: any) {
    event.preventDefault();
    const submitSearch = this.props.submitSearch;
    const query = this.state.query;
    submitSearch(query);
  }

  render() {
    return (
      <div className="searchForm">
        <input className="searchBox"
               type="text"
               placeholder="Add seed tracks"
               name="searchQuery"
               value={this.state.query}
               onChange={(evt) => this.handleChange(evt)}
        />
        <button className="searchButton"
                onClick={(evt) => this.handleSearch(evt)}>Search</button>
      </div>
    );
  }
}
