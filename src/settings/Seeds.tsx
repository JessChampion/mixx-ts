import * as R from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';

import {removeSeed} from './actions';
import SeedsComponent from './components/SeedsComponent';

interface IStateProps {
  seeds: any[];
  seedError: string;
}

interface IDispatchProps {
  onRemoveSeed: any;
}

const getStateProps = R.applySpec({
  seedError: R.pathOr([], ['settings', 'seedError']),
  seeds: R.pathOr([], ['settings', 'seeds'])
});

const mapStateToProps = (state: any) => getStateProps(state) as IStateProps;

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveSeed: (seedId: string) => {
      dispatch(removeSeed(seedId));
    }
  };
};

class Seeds extends React.Component<IStateProps & IDispatchProps, any> {
  render() {
    const {seeds, onRemoveSeed} = this.props;
    return (
      <SeedsComponent seeds={seeds} removeSeed={onRemoveSeed}/>
    );
  }
}

export default connect<IStateProps, IDispatchProps, IStateProps & IDispatchProps>
  (mapStateToProps, mapDispatchToProps)(Seeds);
