// import * as React from 'react';
// // import {addSeed} from '../actions/settings';
// // import {IStore, IStoreContext} from '../reducers';
// import {ISearchState} from '../reducers/reducers/search';
//
// // The mapping function tailors the store's state to the view's state.
// function mapStateFromStore(store: IStore): ISearchState {
//   return {
//     searchResults: store.search.searchResults
//   };
// }
//
// export default class SearchResults extends React.Component<any, any> {
//   static contextTypes: React.ValidationMap<any> = {
//     store: React.PropTypes.object
//   };
//
//   context: IStoreContext;
//   unsubscribe: Function;
//
//   constructor(props: any) {
//     super(props);
//     if (!this.state) {
//       this.state = {searchResults: {loading: false}};
//     }
//   }
//
//   componentDidMount() {
//     // This helper wraps common code so we can initialze state and then subscribe.
//     this.setStateFromStore();
//     this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
//   }
//
//   componentWillUnmount() {
//     if (this.unsubscribe) {
//       this.unsubscribe();
//     }
//   }
//
//   setStateFromStore() {
//     this.setState(mapStateFromStore(this.context.store.getState()));
//   }
//
//   addSeedTrack(result) {
//     //noinspection TypeScriptValidateTypes
//     this.context.store.dispatch(addSeed(result));
//   }

// };

import * as R from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';

// import {registerSection, toggleSection} from '../actions';
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
      // dispatch(addSeed(result));
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
