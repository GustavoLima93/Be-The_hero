import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import Logon from '../pages/Logon';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Incident from '../pages/Incident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" isPrivate component={Profile} />
        <Route path="/incidents/new" isPrivate component={Incident} />
      </Switch>
    </BrowserRouter>
  );
}
