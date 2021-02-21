import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../pages/AdvertsPage';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../pages/SignupPage';

// import { auhtLogin, authLogout } from '../../store/actions';
// import {
//   getIsLoggedUser,
//   getUsername,
//   getUserEmail,
// } from '../../store/selectors';

function App() {
  // const handleLogin = data => {
  //   console.log('data en App:', data);
  //   const { tokenJWT, username, userEmail } = data;
  //   console.log('isLogged en App:', !!tokenJWT);
  //   authLoginD(!!tokenJWT, username, userEmail);
  // };
  // const handleLogout = () => authLogoutD();

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

// App.propTypes = {
//   authLoginD: PropTypes.func,
//   authLogoutD: PropTypes.func,
//   isLogged: PropTypes.bool,
// };
// App.defaultProps = {
//   authLoginD: PropTypes.func,
//   authLogoutD: PropTypes.func,
//   isLogged: false,
// };

// const mapStateToProps = state => ({
//   isLogged: getIsLoggedUser(state),
//   username: getUsername(state),
//   userEmail: getUserEmail(state),
// });
//
// const mapDispatchToProps = {
//   authLoginD: auhtLogin,
//   authLogoutD: authLogout,
// };
// const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
//
// export default ConnectedApp;
export default App;
