import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthLayout from 'layouts/Auth.js';
import Wholesale from 'layouts/Wholesale.js';
import Producer from 'layouts/Producer.js';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      {/* <Route path={`/admin`} component={AdminLayout} /> */}
      <Route path={`/wholesale`} component={Wholesale} />
      <Route path={`/producer`} component={Producer} />
      <Redirect from={`/`} to='/admin/dashboard' />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
