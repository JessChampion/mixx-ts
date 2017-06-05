import * as React from 'react';
import {connect} from 'react-redux';

import {searchSpotify} from './actions';
import SearchFormComponent from './SearchFormComponent';

interface IDispatchProps {
  onSearch: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearch: (query: string) => {
      dispatch(searchSpotify(query));
    }
  };
};

class SearchForm extends React.Component<{}, any> {
  render() {
    const {onSearch} = this.props as IDispatchProps;
    return (
      <SearchFormComponent submitSearch={onSearch}/>
    );
  }
}

export default connect<{}, IDispatchProps, IDispatchProps>(null, mapDispatchToProps)(SearchForm);
