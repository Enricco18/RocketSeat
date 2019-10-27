import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Perfil from '../pages/Perfil';
import Dashboard from '../pages/Dashboard';
import Detalhes from '../pages/Detalhes';
import Edit from '../pages/Edit';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/edit" component={Edit} isPrivate />

            <Route path="/profile" component={Perfil} isPrivate />

            <Route path="/signup" component={SignUp} />

            <Route path="/dashboard" component={Dashboard} isPrivate />

            <Route path="/details" component={Detalhes} />
        </Switch>
    );
}
