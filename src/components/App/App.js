import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../pages/AdvertsPage';
import AdvertPage from '../pages/AdvertPage';
import NewAdvertPage from '../pages/NewAdvertPage';
import EditAdvertPage from '../pages/EditAdvertPage';
import PrivateRoute from '../auth/PrivateRoute';
import LoginPage from '../auth/LoginPage';
import { SignupPage, SignupConfirmPage } from '../pages/SignupPage';
import ForgotPassPage from '../pages/ForgotPassPage';
import ResetPassPage from '../pages/ResetPassPage';
import UserPage from '../pages/UserPage';
import EditUserPage from '../pages/EditUserPage';
import UserFavsPage from '../pages/UserFavsPage';
import UserSoldPage from '../pages/UserSoldPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/adverts" exact component={AdvertsPage} />

        <Route path="/adverts/view/:id" exact component={AdvertPage} />
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signup/confirm/:token" component={SignupConfirmPage} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/forgotpass">
          <ForgotPassPage />
        </Route>
        <Route path="/resetpass/:hash" component={ResetPassPage} />
        <PrivateRoute path="/adverts/new" exact>
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/edit/:id" exact>
          <EditAdvertPage />
        </PrivateRoute>

        <Route path="/user/:username" exact component={UserPage} />
        <Route path="/user/:username/favs" exact component={UserFavsPage} />
        <Route path="/user/:username/sold" exact component={UserSoldPage} />
        <Route path="/user/edit/:username" exact component={EditUserPage} />

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
