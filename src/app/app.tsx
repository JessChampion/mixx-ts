import {createBrowserHistory} from 'history';
import * as React from 'react';
import {Route, Router, Switch} from 'react-router';

import './app.css';
import LoginView from './views/loginView';
import MainView from './views/mainView';
import NotFoundView from './views/notFoundView';

class App extends React.Component<{}, null> {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="appWrapper">
          <Switch>
            <Route exact={true} path="/" component={MainView}/>
            <Route path="/login" component={LoginView}/>
            <Route component={NotFoundView}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
