import * as React from 'react';

import './searchForm.css';

export interface ISearchFormComponentProps {
  submitSearch: any;
}

export default class SearchFormComponent extends React.Component<ISearchFormComponentProps, any> {

  render() {
    const submitSearch = this.props.submitSearch;
    return (
      <div>
        <form className="searchForm"
              onSubmit={(evt) => submitSearch(evt)}
        >
          <input className="searchBox"
                 type="text"
                 placeholder="Add seed tracks"
                 name="searchQuery"
          />
          <input type="submit"
                 value="Search"
                 className="button"
          />
        </form>
      </div>
    );
  }
}
