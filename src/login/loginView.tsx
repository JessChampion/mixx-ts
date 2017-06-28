import * as React from 'react';
import './components/login.css';
import LoginForm from './components/LoginForm';

export default class Login extends React.Component<any, any> {
  render() {
    const hist = this.props.history;
    return (
      <div className="loginView">
        <div className="login">
          <div className="content">
            <h1 className="title">MIX</h1>
            <LoginForm history={hist} location={location}/>
          </div>
        </div>
      </div>
    );
  }
}
