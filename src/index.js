import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthLayout from 'layouts/Auth.js';
import Wholesale from 'layouts/Wholesale.js';
import Producer from 'layouts/Producer.js';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/wholesale`} component={Wholesale} />
      <Route path={`/producer`} component={Producer} />
      <Redirect from={`/`} to='/auth//signin' />
    </Switch>
  </Router>,
  document.getElementById('root')
);
