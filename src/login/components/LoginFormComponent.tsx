import * as React from 'react';

export interface ILoginFormComponentProps {
  loginWithSpotify: any;
}

export default class LoginFormComponent extends React.Component<ILoginFormComponentProps, any> {
  render() {
    const loginWithSpotify = this.props.loginWithSpotify;
    return (
      <div className="loginForm">
        <button className="login-btn button" onClick={() => loginWithSpotify()}>
          Login with Spotify
          <i className="fa fa-spotify" aria-hidden="true"/>
        </button>
      </div>
    );
  }
}
