import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import NewAppointment from './pages/NewAppointment';
import Conversation from './pages/Conversation';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/appointment/new" component={NewAppointment} />
        <Route path="/conversation" component={Conversation} />
      </Switch>
    </BrowserRouter>
  );
}