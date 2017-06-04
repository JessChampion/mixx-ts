import {createBrowserHistory} from 'history';
import * as React from 'react';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router';

import LoginView from '../login/loginView';
import MainView from '../main/mainView';
import NotFoundView from './notFoundView';

import store from '../store';
import './app.css';

class App extends React.Component<{}, null> {
  render() {
    return (
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <div className="appWrapper">
            <Switch>
              <Route exact={true} path="/" component={MainView}/>
              <Route path="/login" component={LoginView}/>
              <Route component={NotFoundView}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
