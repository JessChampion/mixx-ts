import * as R from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';

import {addSeed} from '../settings/actions';
import SearchResultsComponent from './components/SearchResultsComponent';

interface IOwnProps {
  children?: any;
}

interface IStateProps {
  data: any[];
  loading: boolean;
}

interface IDispatchProps {
  addSeedTrack: any;
}

const getStateProps = R.applySpec({
  data: R.pathOr([], ['search', 'searchResults']),
  loading: R.pathOr(false, ['search', 'loading'])
});
const mapStateToProps = (state: any) => getStateProps(state) as IStateProps;

const mapDispatchToProps = (dispatch: any) => {
  return {
    addSeedTrack: (result: any) => {
      dispatch(addSeed(result));
      console.log('Add seed: ' + result);
    },
  };
};

class Section extends React.Component<IStateProps & IDispatchProps & IOwnProps, any> {

  render() {
    const props = this.props;
    return (
      <SearchResultsComponent {...props}/>
    );
  }
}

export default connect<IStateProps, IDispatchProps, IStateProps & IDispatchProps & IOwnProps>
(mapStateToProps, mapDispatchToProps)(Section);
