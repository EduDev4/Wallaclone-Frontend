import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../pages/AdvertsPage';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/adverts" exact>
          <AdvertsPage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/404" exact>
          {/* <NotFoundPage /> */}
          <div className="errornotfound">
            <h1>404 - Not Found</h1>
          </div>
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
