import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../pages/AdvertsPage';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../pages/SignupPage';

export const AuthContext = React.createContext();

function App({ initiallyLoggedUser }) {
  const [loggedUser, setloggedUser] = useState(initiallyLoggedUser);

  const handleLogin = isLogged => setloggedUser(isLogged);
  const handleLogout = () => setloggedUser(false);

  return (
    <AuthContext.Provider
      value={{
        isLogged: loggedUser,
        onLogout: handleLogout,
      }}
    >
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
            <LoginPage onLogin={handleLogin} />
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
    </AuthContext.Provider>
  );
}

App.propTypes = {
  initiallyLoggedUser: PropTypes.bool,
};
App.defaultProps = {
  initiallyLoggedUser: false,
};

export default App;
