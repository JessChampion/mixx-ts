import * as R from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';

import {loggedInWithSpotify, login} from './actions';
import LoginFormComponent from './LoginFormComponent';

const getTokenAndExpiry = R.pickAll(['token', 'expires']);
const getHasUser = R.compose(R.objOf('hasUser'), R.not, R.isNil, R.prop('user'));
const getStateProps = R.compose(R.converge(R.merge, [getTokenAndExpiry, getHasUser]) as any, R.prop('auth'));
const mergeProps = R.useWith(R.merge, [R.identity, getStateProps]);
const mapStateToProps = (state: any, ownProps: any) => {
  return mergeProps(ownProps, state);
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoginReceived: (params: any, hasUser: boolean) => {
      dispatch(loggedInWithSpotify(params, hasUser));
    },
    onLoginRequest: () => {
      dispatch(login());
    }
  };
};

interface ILoginProps {
  history: any;
  location: any;
}

interface IStateProps {
  token: string;
  expires?: number;
  hasUser: boolean;
}

interface IDispatchProps {
  onLoginReceived: any;
  onLoginRequest: any;
}

type IProps = (IStateProps & IDispatchProps & ILoginProps);

class SearchForm extends React.Component<IProps, any> {
  checkForToken() {
    const {
      location,
      hasUser,
      history,
      onLoginReceived,
      token
    } = this.props;
    if (location.hash) {
      if (token.length <= 0) {
        onLoginReceived(location.hash, hasUser);
      }
      history.push('/');
    }
  }

  componentDidMount() {
    this.checkForToken();
  }

  render() {
    const {onLoginRequest} = this.props;
    return (
      <LoginFormComponent loginWithSpotify={onLoginRequest}/>
    );
  }
}

export default connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(SearchForm);
