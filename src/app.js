import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

import AuthLayout from 'layouts/Auth.js';
import Wholesale from 'layouts/Wholesale.js';
import Producer from 'layouts/Producer.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />

        <Route path={`/wholesale`} component={Wholesale} />
        <Route path={`/producer`} component={Producer} />
        <Redirect from={`/`} to='/auth/signin' />
      </Switch>
    </Router>
  );
};

export default App;
