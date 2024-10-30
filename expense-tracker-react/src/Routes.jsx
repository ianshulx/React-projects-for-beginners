import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { isLoggedIn } from './Helpers';

import Website from "./app/landing/Website";
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import DashboardLayout from './app/layouts/DashboardLayout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path={'/'} component={Website} />
      <GuestRoute exact path={'/login'} component={Login} />
      <GuestRoute exact path={'/register'} component={Register} />
      <PrivateRoute strict path={'/'} component={DashboardLayout} />
    </Switch>
  </HashRouter>
);

export default React.memo(Routes);
